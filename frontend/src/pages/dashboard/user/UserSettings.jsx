import { useContext, useEffect, useState } from "react"
import { BASE_URL, token } from "../../../config.js"
import { HashLoader } from "react-spinners"
import { toast } from 'react-toastify'
import { BiShow, BiHide } from "react-icons/bi"
import defaultAvatar from "/images/default-avatar.jpg"
import { AuthContext } from "../../../context/AuthContext.jsx"

export default function UserSettings({ user }) {
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState("")
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", bloodType: "", gender: "", photo: selectedFile })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { dispatch } = useContext(AuthContext)

    useEffect(() => {
        setFormData({ name: user.name, email: user.email, photo: user.photo, gender: user.gender, bloodType: user.bloodType })
    }, [user])

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
            setAvatarLoading(false)
        } catch (error) {
            toast.error(error.message)
            setAvatarLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!")
            return
        }
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/users/${user._id}`, {
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

    return (
        <div>
            <h2 className="text-headingColor text-[22px] leading-9 font-bold dark:text-slate-300">
                Update your <span className="text-primaryColor dark:text-blue-500">profile</span>
            </h2>
            <div className="mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name *"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-2 py-3 border-b border-solid border-[#0066ff40] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:rounded-lg"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-2 py-3 border-b border-solid border-[#0066ff40] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:rounded-lg"
                            autoComplete="off"
                            aria-readonly
                            readOnly
                            disabled="true"
                        />
                    </div>
                    <div className="mb-5 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="New Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-2 py-3 border-b border-solid border-[#0066ff40] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:rounded-lg"
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-4 text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </button>
                    </div>
                    <div className="mb-5 relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-2 py-3 border-b border-solid border-[#0066ff40] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:rounded-lg"
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-2 top-4 text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                        >
                            {showConfirmPassword ? <BiShow /> : <BiHide />}
                        </button>
                    </div>
                    <div className="mb-5 px-1 flex flex-col justify-center sm:flex-row sm:items-center sm:justify-between">
                        <label className="text-headingColor font-semibold text-[16px] leading-7 dark:text-slate-300">
                            Blood Type *:
                            <select
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleInputChange}
                                className="text-textColor font-semibold text-[15px] leading-7 px-2 py-3 focus:outline-none cursor-pointer hover:opacity-70 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-slate-100"
                                required
                            >
                                <option value="">Select</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </label>
                        <label className="text-headingColor font-semibold text-[16px] leading-7 dark:text-slate-300">
                            Gender *:
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="text-textColor font-semibold text-[15px] leading-7 px-2 py-3 focus:outline-none cursor-pointer hover:opacity-70 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-slate-100"
                                required
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex px-1 items-center gap-3">
                        <figure className="w-[70px] h-[70px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img
                                src={selectedFile ? previewURL : user.photo || defaultAvatar}
                                alt=""
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
                        <button type="submit" className="btn w-full rounded-lg text-[18px]" disabled={loading && true}>
                            {loading ? <HashLoader size={20} color="#fff" /> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
