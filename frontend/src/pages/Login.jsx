import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import loginImg from "../assets/images/login.png"
import { BASE_URL } from "../config"
import { toast } from "react-toastify"
import { authContext } from "../context/AuthContext.jsx"
import { HashLoader } from "react-spinners"

export default function Login() {

    const [formData, setFormData] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const { dispatch } = useContext(authContext)

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    user: result.data,
                    role: result.role,
                    token: result.token,
                }
            })
            // console.log(result)
            setLoading(false)
            toast.success(result.message)
            navigate("/home")
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <section className="px-5 lg:px-0">
            <div className="w-full max-w-[470px] mx-auto rounded-lg shadow-2xl p-4 md:p-10">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                    Hello!
                    <span className="text-primaryColor"> Welcome </span>
                    Back 🎉
                </h3>
                <div className="flex justify-center mb-2">
                    <img src={loginImg} alt="" className="w-1/3 xl:w-1/4 2xl:w-1/2" />
                </div>
                <form className="py-4 md:py-0" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-2 py-3 border-b border-solid border-[#0066ff40] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-2 py-3 border-b border-solid border-[#0066ff40] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn w-full rounded-lg text-[18px]">
                            {loading ? <HashLoader size={20} color="#fff" /> : "Login"}
                        </button>
                    </div>
                    <p className="mt-5 text-textColor text-center">
                        Don&apos;t have an account?
                        <Link to="/register" className="text-primaryColor font-medium ml-1 hover:opacity-70">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    )
}
