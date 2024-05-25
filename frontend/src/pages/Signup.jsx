import signupImg from "../assets/images/signup.gif"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { BASE_URL } from "../config"
import { HashLoader } from "react-spinners"
import { toast } from 'react-toastify'
import defaultAvatar from "../assets/images/default-avatar.jpg"

export default function Signup() {

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState("")
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "patient", gender: "", photo: selectedFile })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        setAvatarLoading(true)

        const cachedURL = URL.createObjectURL(file)
        setSelectedFile(cachedURL)
        setPreviewURL(cachedURL)

        /* Image Upload */
        try {
            const uploadData = new FormData();
            uploadData.append("photo", file)
            const res = await fetch(`${BASE_URL}/upload/avatar`, {
                method: "post",
                body: uploadData,
            });
            const data = await res.json();
            // setSelectedFile(data.filePath)
            // setPreviewURL(data.filePath)
            setFormData({ ...formData, photo: data?.filePath })
            setAvatarLoading(false)
        } catch (error) {
            toast.error(error.message)
            setAvatarLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const { message } = await res.json()
            if (!res.ok) throw new Error(message)
            setLoading(false)
            toast.success(message)
            navigate("/login")
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <section className="px-5 xl:px-0">
            <div className="max-w-[470px] lg:max-w-[1170px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image */}
                    <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                        <figure className="rounded-l-lg">
                            <img src={signupImg} alt="" className="w-full rounded-l-lg" />
                        </figure>
                    </div>
                    {/* Form */}
                    <div className="rounded-l-lg lg:pl-16 py-10">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                            Create an
                            <span className="text-primaryColor"> account</span>
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-1 py-3 border-b border-solid border-[#0066ff40] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-5">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-1 py-3 border-b border-solid border-[#0066ff40] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-5">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-1 py-3 border-b border-solid border-[#0066ff40] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-5 flex items-center justify-between">
                                <label className="text-headingColor font-bold text-[16px] leading-7">
                                    Role:
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none cursor-pointer hover:opacity-70"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                </label>
                                <label className="text-headingColor font-bold text-[16px] leading-7">
                                    Gender:
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none cursor-pointer hover:opacity-70"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                            </div>
                            <div className="mb-5 flex items-center gap-3">
                                <figure className="w-[70px] h-[70px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                                    <img
                                        src={selectedFile ? previewURL : defaultAvatar}
                                        alt=""
                                        className="w-[66px] h-[66px] rounded-full"
                                    />
                                </figure>
                                <div className="relative w-[130px] h-[50px]">
                                    <input
                                        type="file"
                                        name="photo"
                                        id="customFile"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleImageChange}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <label
                                        htmlFor="customFile"
                                        className="absolute top-0 left-0 w-full h-full flex items-center px-4 py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer hover:opacity-70">
                                        {avatarLoading ? "Uploading..." : "Upload Photo"}
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn w-full rounded-lg text-[18px]" disabled={loading && true}>
                                    {loading ? <HashLoader size={20} color="#fff" /> : "Sign Up"}
                                </button>
                            </div>
                            <p className="mt-5 text-textColor text-center">
                                Already have an account?
                                <Link to="/login" className="text-primaryColor font-medium ml-1 hover:opacity-70">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
