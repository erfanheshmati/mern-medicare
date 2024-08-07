import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../config"
import { toast } from 'react-toastify'
import { HashLoader } from "react-spinners"
import { BiShow, BiHide } from "react-icons/bi"
import signupImg from "/images/signup.gif"
import defaultAvatar from "/images/default-avatar.jpg"

export default function Signup() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState("")
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "patient", photo: selectedFile })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordValidationMessage, setPasswordValidationMessage] = useState("")

    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (e.target.name === "password") {
            validatePassword(e.target.value)
        }
    }

    const validatePassword = (password) => {
        const criteria = [
            // { regex: /[A-Z]/, message: "* At least one uppercase letter is required" },
            // { regex: /[a-z]/, message: "* At least one lowercase letter is required" },
            // { regex: /[0-9]/, message: "* At least one number is required" },
            // { regex: /[^A-Za-z0-9]/, message: "* At least one special character is required" },
            { regex: /.{8,}/, message: "* At least 8 characters long is required" }
        ];
        const failedCriteria = criteria.filter(criterion => !criterion.regex.test(password))
        if (failedCriteria.length > 0) {
            setPasswordValidationMessage(`${failedCriteria.map(c => c.message).join("\n")}`)
        } else {
            setPasswordValidationMessage("")
        }
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (file.size > 1024 * 1024) {
            return toast.error("File size exceeds 1 MB, please choose a smaller file.")
        }
        setAvatarLoading(true)
        // const cachedURL = URL.createObjectURL(file)
        // setSelectedFile(cachedURL)
        // setPreviewURL(cachedURL)

        // Upload Image
        try {
            const uploadData = new FormData();
            uploadData.append("photo", file)
            const res = await fetch(`${BASE_URL}/upload/avatar`, {
                method: "POST",
                body: uploadData,
            });
            const data = await res.json()
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
            return toast.error("Passwords do not match.")
        }
        if (passwordValidationMessage) {
            return toast.error("Password does not meet the criteria.");
        }
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message)
            setLoading(false)
            toast.success(result.message)
            navigate("/login", { replace: true })
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <section className="px-4 xl:px-0 h-screen-mobile md:h-screen-desktop xl:h-screen 2xl:h-screen-desktop flex flex-col justify-center">
            <div className="w-full max-w-[470px] lg:max-w-[1170px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* ===== Image ===== */}
                    <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                        <figure className="rounded-l-xl">
                            <img src={signupImg} alt="" className="w-full rounded-l-xl" />
                        </figure>
                    </div>
                    {/* ===== Form ===== */}
                    <div className="rounded-l-lg lg:pl-16">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-6 text-center md:text-start dark:text-slate-300">
                            Create an
                            <span className="text-primaryColor dark:text-blue-500"> account</span>
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name *"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-[10px] border border-solid border-[#0066ff40] focus:outline-none focus:border-primaryColor rounded-lg text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:focus:border-blue-200"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-5">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-[10px] border border-solid border-[#0066ff40] focus:outline-none focus:border-primaryColor rounded-lg text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:focus:border-blue-200"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-3 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password *"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`${passwordValidationMessage !== "" && "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"} w-full px-2 py-[10px] border border-solid border-[#0066ff40] focus:outline-none focus:border-primaryColor rounded-lg text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:focus:border-blue-200`}
                                    required
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-[14px] text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                                >
                                    {showPassword ? <BiShow /> : <BiHide />}
                                </button>
                                {passwordValidationMessage && (
                                    <div className="mt-2 text-sm text-red-500 dark:text-red-400 transition-all ease-in-out delay-500">
                                        {passwordValidationMessage.split('\n').map((msg, index) => (
                                            <div key={index}>{msg}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4 relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password *"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-[10px] border border-solid border-[#0066ff40] focus:outline-none focus:border-primaryColor rounded-lg text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:focus:border-blue-200"
                                    required
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-2 top-[14px] text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                                >
                                    {showConfirmPassword ? <BiShow /> : <BiHide />}
                                </button>
                            </div>
                            <div className="mb-4">
                                <label className="text-headingColor font-semibold text-[16px] leading-7 px-1 dark:text-slate-300">
                                    Role:
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="text-textColor font-semibold text-[15px] leading-7 px-2 py-3 focus:outline-none cursor-pointer hover:opacity-70 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-slate-100"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                </label>
                            </div>
                            <div className="flex items-center gap-3 px-1">
                                <figure className="w-[70px] h-[70px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                                    <img
                                        src={selectedFile ? previewURL : defaultAvatar}
                                        alt="Avatar"
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
                                        onChange={handleImageUpload}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        required
                                    />
                                    <label
                                        htmlFor="customFile"
                                        className="absolute top-0 left-0 w-full h-full flex items-center px-4 py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer hover:bg-[#0066ff66] dark:bg-blue-500 dark:text-slate-100 dark:hover:bg-blue-600">
                                        {avatarLoading ? "Uploading..." : "Upload Photo *"}
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn w-full text-[18px]" disabled={loading && true}>
                                    {loading ? <HashLoader size={20} color="#fff" /> : "Sign Up"}
                                </button>
                            </div>
                            <p className="mt-5 text-textColor text-center dark:text-slate-300">
                                Already have an account?
                                <Link to="/login" className="text-primaryColor font-medium ml-1 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
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
