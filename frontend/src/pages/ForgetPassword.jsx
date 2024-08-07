import { useState } from "react"
import { HashLoader } from "react-spinners"
import { toast } from "react-toastify"
import { BASE_URL } from "../config"

export default function ForgetPassword() {
    const [formData, setFormData] = useState({ email: "" })
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/auth/forget-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message)
            toast.success(result.message)
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <section className="px-4 lg:px-0 h-screen-mobile md:h-screen-desktop flex flex-col justify-center">
            <div className="w-full max-w-[470px] mx-auto rounded-lg md:shadow-2xl md:p-10">
                <h3 className="text-headingColor text-[22px] text-center leading-9 font-bold dark:text-slate-300">
                    <span className="text-primaryColor dark:text-blue-500"> Forget </span>
                    Password
                </h3>
                <form className="py-4 md:py-0 mt-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-[16px] text-slate-700 dark:text-slate-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-2 py-[10px] mt-1 border border-solid border-[#0066ff40] focus:outline-none focus:border-primaryColor rounded-lg text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:focus:border-blue-200"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn w-full text-[18px]">
                            {loading ? <HashLoader size={20} color="#fff" /> : "Send reset link"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}
