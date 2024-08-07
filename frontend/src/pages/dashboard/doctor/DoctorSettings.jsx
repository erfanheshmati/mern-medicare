import { useContext, useEffect, useState } from "react"
import { BASE_URL, token } from "../../../config.js"
import { HashLoader } from "react-spinners"
import { toast } from 'react-toastify'
import { BiShow, BiHide } from "react-icons/bi"
import { AiOutlineDelete } from "react-icons/ai"
import defaultAvatar from "/images/default-avatar.jpg"
import { AuthContext } from "../../../context/AuthContext.jsx"

export default function DoctorSettings({ doctor }) {
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState("")
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        bio: "",
        gender: "",
        specialization: "",
        ticketPrice: null,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: "",
        photo: selectedFile
    })

    const { dispatch } = useContext(AuthContext)

    useEffect(() => {
        setFormData({
            name: doctor?.name,
            email: doctor?.email,
            phone: doctor?.phone,
            bio: doctor?.bio,
            gender: doctor?.gender,
            specialization: doctor?.specialization,
            ticketPrice: doctor?.ticketPrice,
            qualifications: doctor?.qualifications,
            experiences: doctor?.experiences,
            timeSlots: doctor?.timeSlots,
            about: doctor?.about,
            photo: doctor?.photo
        })
    }, [doctor])

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (file.size > 1024 * 1024) {
            return toast.error("File size exceeds 1 MB, please choose a smaller file.")
        }
        if (!file.size) {
            return toast.error("Please upload an image.")
        }
        setAvatarLoading(true)
        // const cachedURL = URL.createObjectURL(file)
        // setSelectedFile(cachedURL)
        // setPreviewURL(cachedURL)

        /* Upload Image */
        try {
            const uploadData = new FormData();
            uploadData.append("photo", file)
            const res = await fetch(`${BASE_URL}/upload/avatar`, {
                method: "POST",
                body: uploadData,
            });
            const data = await res.json();
            setSelectedFile(data.filePath)
            setPreviewURL(data.filePath)
            setFormData({ ...formData, photo: data?.filePath })
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setAvatarLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match!")
        }
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctor._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message)
            dispatch({
                type: "USER_UPDATE",
                payload: { user: result.data }
            })
            setLoading(false)
            toast.success(result.message)
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    // Reusable function for adding item
    const addItem = (key, item) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }))
    }
    // Reusable function for input change 
    const handleReusableInputChange = (key, index, event) => {
        const { name, value } = event.target
        setFormData(prevFormData => {
            const updateItems = [...prevFormData[key]]
            updateItems[index][name] = value
            return {
                ...prevFormData,
                [key]: updateItems
            }
        })
    }
    // Reusable function for deleting item
    const deleteItem = (key, index) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: prevFormData[key].filter((_, i) => i !== index)
        }))
    }

    // Qualification functions
    const addQualification = (e) => {
        e.preventDefault()
        addItem("qualifications", { startingDate: "", endingDate: "", degree: "Ph.D", university: "Dhaka Medical College" })
    }
    const handleQualificationChange = (event, index) => {
        handleReusableInputChange("qualifications", index, event)
    }
    const deleteQualification = (e, index) => {
        e.preventDefault()
        deleteItem("qualifications", index)
    }

    // Experience functions
    const addExperience = (e) => {
        e.preventDefault()
        addItem("experiences", { startingDate: "", endingDate: "", position: "Senior Surgeon", hospital: "Dhaka Medical Hospital" })
    }
    const handleExperienceChange = (event, index) => {
        handleReusableInputChange("experiences", index, event)
    }
    const deleteExperience = (e, index) => {
        e.preventDefault()
        deleteItem("experiences", index)
    }

    // TimeSlot functions
    const addTimeSlot = (e) => {
        e.preventDefault()
        addItem("timeSlots", { day: "Sunday", startingTime: "10:00", endingTime: "04:30" })
    }
    const handleTimeSlotChange = (event, index) => {
        handleReusableInputChange("timeSlots", index, event)
    }
    const deleteTimeSlot = (e, index) => {
        e.preventDefault()
        deleteItem("timeSlots", index)
    }

    return (
        <div>
            <h2 className="text-headingColor text-[22px] leading-9 font-bold dark:text-slate-300">
                Update your <span className="text-primaryColor dark:text-blue-500">profile</span>
            </h2>
            <div className="mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-center md:gap-10">
                        <div className="w-full md:w-1/2 mb-5 space-y-1">
                            <label className="form__label">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form__input"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 mb-5 space-y-1">
                            <label className="form__label">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form__input"
                                autoComplete="off"
                                aria-readonly
                                readOnly
                                disabled="true"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:gap-10">
                        <div className="w-full md:w-1/2 mb-5 space-y-1 relative">
                            <label className="form__label">New Password *</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form__input"
                                autoComplete="off"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-10 text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                            >
                                {showPassword ? <BiShow /> : <BiHide />}
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 mb-5 space-y-1 relative">
                            <label className="form__label">Confirm Password *</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="form__input"
                                autoComplete="off"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-10 text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                            >
                                {showConfirmPassword ? <BiShow /> : <BiHide />}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:gap-10">
                        <div className="w-full md:w-1/2 mb-5 space-y-1">
                            <label className="form__label">Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="09xxxxxxxxx"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="form__input"
                                pattern="[0-9]{11}"
                                minLength={11}
                                maxLength={11}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 mb-5 space-y-1">
                            <label className="form__label">Biography *</label>
                            <input
                                type="text"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="form__input"
                                maxLength={50}
                                autoComplete="off"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:gap-10">
                        <div className="w-full md:w-1/3 mb-5 space-y-1">
                            <label className="form__label">Gender *</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="form__input cursor-pointer"
                                required
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/3 mb-5 space-y-1">
                            <label className="form__label">Specialization *</label>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className="form__input cursor-pointer"
                                required
                            >
                                <option value="">Select</option>
                                <option value="dermatologist">Dermatologist</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="urologist">Urologist</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/3 mb-5 space-y-1">
                            <label className="form__label">Ticket Price *</label>
                            <input
                                type="number"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                onChange={handleInputChange}
                                className="form__input no-spinner"
                                step="any"
                                autoComplete="off"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-5 mt-1">
                        <label className="form__label font-bold text-lg">Qualifications *</label>
                        {formData.qualifications?.map((item, index) => (
                            <div key={index} className="mt-1">
                                <div className="grid grid-cols-2 gap-x-2 md:gap-x-10 mb-1">
                                    <div className="space-y-1">
                                        <label className="form__label">Starting Date</label>
                                        <input
                                            type="date"
                                            name="startingDate"
                                            value={item.startingDate}
                                            onChange={e => handleQualificationChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="form__label">Ending Date</label>
                                        <input
                                            type="date"
                                            name="endingDate"
                                            value={item.endingDate}
                                            onChange={e => handleQualificationChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2 md:gap-x-10">
                                    <div className="space-y-1">
                                        <label className="form__label">Degree</label>
                                        <input
                                            type="text"
                                            name="degree"
                                            value={item.degree}
                                            onChange={e => handleQualificationChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="form__label">University</label>
                                        <input
                                            type="text"
                                            name="university"
                                            value={item.university}
                                            onChange={e => handleQualificationChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={e => deleteQualification(e, index)}
                                    className="bg-red-600 p-3 rounded-md text-white text-[18px] my-2 cursor-pointer hover:bg-red-700"
                                >
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        ))}
                        <div className="flex mt-1">
                            <button
                                onClick={addQualification}
                                className="bg-slate-800 py-2 px-4 rounded-md text-white h-fit cursor-pointer hover:bg-slate-950 dark:bg-slate-900 dark:hover:bg-black"
                            >
                                Add Qualification
                            </button>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="form__label font-bold text-lg">Experiences *</label>
                        {formData.experiences?.map((item, index) => (
                            <div key={index} className="mt-1">
                                <div className="grid grid-cols-2 gap-x-2 md:gap-x-10 mb-1">
                                    <div className="space-y-1">
                                        <label className="form__label">Starting Date</label>
                                        <input
                                            type="date"
                                            name="startingDate"
                                            value={item.startingDate}
                                            onChange={e => handleExperienceChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="form__label">Ending Date</label>
                                        <input
                                            type="date"
                                            name="endingDate"
                                            value={item.endingDate}
                                            onChange={e => handleExperienceChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2 md:gap-x-10">
                                    <div className="space-y-1">
                                        <label className="form__label">Position</label>
                                        <input
                                            type="text"
                                            name="position"
                                            value={item.position}
                                            onChange={e => handleExperienceChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="form__label">Hospital</label>
                                        <input
                                            type="text"
                                            name="hospital"
                                            value={item.hospital}
                                            onChange={e => handleExperienceChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={e => deleteExperience(e, index)}
                                    className="bg-red-600 p-3 rounded-md text-white text-[18px] my-2 cursor-pointer hover:bg-red-700"
                                >
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        ))}
                        <div className="flex mt-1">
                            <button
                                onClick={addExperience}
                                className="bg-slate-800 py-2 px-4 rounded-md text-white h-fit cursor-pointer hover:bg-slate-950 dark:bg-slate-900 dark:hover:bg-black"
                            >
                                Add Experience
                            </button>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="form__label font-bold text-lg">Time Slots *</label>
                        {formData.timeSlots?.map((item, index) => (
                            <div key={index} className="mt-1">
                                <div className="grid grid-cols-3 lg:grid-cols-3 gap-x-2 md:gap-x-10">
                                    <div className="space-y-1">
                                        <label className="form__label">Day</label>
                                        <select
                                            name="day"
                                            value={item.day}
                                            onChange={e => handleTimeSlotChange(e, index)}
                                            className="form__input py-[15px]"
                                        >
                                            <option value="">Select</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="form__label">Starting Time</label>
                                        <input
                                            type="time"
                                            name="startingTime"
                                            value={item.startingTime}
                                            onChange={e => handleTimeSlotChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="form__label">Ending Time</label>
                                        <input
                                            type="time"
                                            name="endingTime"
                                            value={item.endingTime}
                                            onChange={e => handleTimeSlotChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={e => deleteTimeSlot(e, index)}
                                    className="bg-red-600 p-3 rounded-md text-white text-[18px] my-2 cursor-pointer hover:bg-red-700"
                                >
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        ))}
                        <div className="flex mt-1">
                            <button
                                onClick={addTimeSlot}
                                className="bg-slate-800 py-2 px-4 rounded-md text-white h-fit cursor-pointer hover:bg-slate-950 dark:bg-slate-900 dark:hover:bg-black"
                            >
                                Add Time Slot
                            </button>
                        </div>
                    </div>
                    <div className="mb-5 space-y-1">
                        <label className="form__label">About *</label>
                        <textarea
                            name="about"
                            placeholder="Write about yourself..."
                            rows={5}
                            value={formData.about}
                            onChange={handleInputChange}
                            className="form__input"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <figure className="w-[70px] h-[70px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img
                                src={selectedFile ? previewURL : doctor.photo || defaultAvatar}
                                alt="Profile Avatar"
                                className="w-[66px] h-[66px] rounded-full object-cover"
                            />
                        </figure>
                        <div className="relative w-[130px] h-[50px]">
                            <input
                                type="file"
                                name="photo"
                                id="customFile"
                                // accept=".jpg, .jpeg, .png"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            // required
                            />
                            <label
                                htmlFor="customFile"
                                className="absolute top-0 left-0 w-full h-full flex items-center px-4 py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer hover:bg-[#0066ff66] dark:bg-blue-500 dark:text-slate-100 dark:hover:bg-blue-600">
                                {avatarLoading ? "Uploading..." : "Upload Photo"}
                            </label>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn w-full text-[18px]" disabled={loading && true}>
                            {loading ? <HashLoader size={20} color="#fff" /> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
