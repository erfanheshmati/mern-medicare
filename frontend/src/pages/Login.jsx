import { useState } from "react"
import { Link } from "react-router-dom"
import loginImg from "../assets/images/login.png"

export default function Login() {

    const [formData, setFormData] = useState({ email: "", password: "" })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <section className="px-5 lg:px-0">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-lg p-4 md:p-10">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                    Hello!
                    <span className="text-primaryColor"> Welcome </span>
                    Back 🎉
                </h3>
                <div className="flex justify-center mb-2">
                    <img src={loginImg} alt="" className="w-1/3 xl:w-1/4 2xl:w-1/2" />
                </div>
                <form className="py-4 md:py-0">
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
                            Login
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
