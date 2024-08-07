import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext.jsx"
import defaultAvatar from "/images/default-avatar.jpg"
import UserBookings from "./UserBookings"
import UserSettings from "./UserSettings.jsx"
import useFetchData from "../../../hooks/useFetchData.js"
import { BASE_URL, token } from "../../../config.js"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
import { CgProfile } from "react-icons/cg"
import { SiQuickbooks } from "react-icons/si"
import { useLogout } from "../../../context/LogoutContext.jsx"

export default function UserAccount() {
    const { user: userData, dispatch } = useContext(AuthContext)
    const { triggerLogout } = useLogout()

    const [tab, setTab] = useState("bookings")

    const navigate = useNavigate()

    const { loading, error } = useFetchData(`${BASE_URL}/users/profile/me`)

    const handleDeleteAccount = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete your account? This action can not be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
            customClass: {
                popup: 'swal2-custom-popup',
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    const response = await res.json()
                    if (!res.ok) throw new Error(response.message)
                    handleLogout()
                    Swal.fire({
                        text: response.message,
                        icon: "success",
                        customClass: {
                            popup: 'swal2-custom-success',
                        }
                    });
                } catch (error) {
                    toast.error(error.message);
                }
            }
        });
    }

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        navigate("/", { replace: true })
        triggerLogout()
    }

    const handleExpiredToken = () => {
        dispatch({ type: "LOGOUT" })
        navigate("/login", { replace: true })
    }

    return (
        <section className="min-h-screen relative">
            <div className="max-w-[1440px] px-4 mx-auto">
                {/* {loading && !error && <Loading />} */}

                {error && !loading && handleExpiredToken()}

                {/* {error && !loading && <Error error={error} />} */}

                {!loading && !error && (
                    <div className="flex flex-col md:flex-row gap-20">
                        {/* Desktop Panel Side */}
                        <div className="hidden md:flex md:flex-col items-center justify-around md:w-1/3 lg:w-1/4 h-[580px] px-[30px] rounded-lg shadow-lg bg-blue-200 dark:bg-slate-800">
                            <div>
                                <div className="flex items-center justify-center">
                                    <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                                        <img src={userData.photo || defaultAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                                    </figure>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-[18px] leading-[30px] text-headingColor font-bold dark:text-slate-300">
                                        {userData.name}
                                    </h3>
                                    <p className="text-textColor text-[15px] leading-6 font-medium dark:text-slate-400">
                                        {userData.email}
                                    </p>
                                    <p className="text-textColor text-[15px] leading-6 font-medium dark:text-slate-400">
                                        Blood type:
                                        <span className="text-red-500 text-[15px] leading-8">
                                            &nbsp;{userData.bloodType}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => setTab("bookings")}
                                    className="btn w-full my-1 rounded-md"
                                >
                                    Bookings
                                </button>
                                <button
                                    onClick={() => setTab("settings")}
                                    className="btn w-full my-1 rounded-md"
                                >
                                    Profile info
                                </button>
                            </div>
                        </div>
                        {/* Content Side */}
                        <div className="md:w-2/3 lg:w-3/4 mb-14 md:mb-0">
                            {tab === "bookings" && <UserBookings />}
                            {tab === "settings" && <UserSettings user={userData} />}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Panel Side */}
            <div className="fixed bottom-0 flex items-center md:hidden w-full justify-around text-sm shadow-[0_-3px_30px_-18px_rgba(0,0,0,0.43)] bg-cyan-100 text-slate-400 dark:text-slate-500 dark:bg-slate-800">
                <button
                    onClick={() => setTab("bookings")}
                    className={`${tab === "bookings" ? "font-semibold text-slate-950 dark:text-slate-300" : ""} p-2`}
                >
                    <div className="flex flex-col items-center">
                        <div><SiQuickbooks size={20} /></div>
                        <div>My bookings</div>
                    </div>
                </button>
                <button
                    onClick={() => setTab("settings")}
                    className={`${tab === "settings" ? "font-semibold text-slate-950 dark:text-slate-300" : ""} p-2`}
                >
                    <div className="flex flex-col items-center">
                        <div><CgProfile size={20} /></div>
                        <div>Profile info</div>
                    </div>
                </button>
            </div>
        </section>
    )
}
