import { NavLink, Link, useNavigate } from "react-router-dom"
import logoBlack from "/images/logo-black.png"
import logoWhite from "/images/logo-white.png"
import defaultAvatar from "/images/default-avatar.jpg"
import { BiMenu } from "react-icons/bi"
import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../context/AuthContext"
import { IoPersonRemoveOutline } from "react-icons/io5"
import { CiLogout } from "react-icons/ci"
import { ThemeContext } from "../context/ThemeContext"
import Swal from "sweetalert2"
import { BASE_URL } from "../config.js"
import { toast } from "react-toastify"
import { useLogout } from "../context/LogoutContext.jsx"
import { Popover } from "flowbite-react"

const navLinks = [
    { path: "/home", display: "Home" },
    { path: "/docs", display: "Find a Doctor" },
    { path: "/services", display: "Services" },
    { path: "/contact", display: "Contact" },
]

export default function Header() {
    const headerRef = useRef(null)
    const menuRef = useRef(null)

    const { user, token, role, dispatch } = useContext(AuthContext)
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)
    const { triggerLogout } = useLogout()

    const navigate = useNavigate()

    const handleStickyHeader = () => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                headerRef.current.classList.add("sticky__header")
            }
            else {
                headerRef.current.classList.remove("sticky__header")
            }
        })
    }

    useEffect(() => {
        handleStickyHeader()
        return () => window.removeEventListener("scroll", handleStickyHeader)
    }, [])

    const toggleMenu = () => {
        menuRef.current.classList.toggle("show__menu")
    }

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
                    const res = await fetch(`${BASE_URL}/users/${user._id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    const response = await res.json()
                    if (!res.ok) throw new Error(response.message)
                    dispatch({ type: "LOGOUT" })
                    navigate("/", { replace: true })
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

    const profileModal = (
        <div className="w-52 text-sm">
            <div className="bg-gray-100 px-3 py-2 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">User Profile</h3>
            </div>
            <div className="px-3 py-2 dark:bg-slate-800">
                <ul>
                    <li className="border-b pb-2 dark:border-b-slate-600">
                        <Link to={`${role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`} className="outline-none">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <figure>
                                    <img src={user?.photo || defaultAvatar} alt="" className="w-[30px] h-[30px] rounded-full object-cover" />
                                </figure>
                                <h2 className="text-slate-700 hover:text-black dark:text-slate-200 dark:hover:text-white">
                                    {user?.name}
                                </h2>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <div className="mt-3">
                            <button
                                onClick={handleDeleteAccount}
                                className="flex items-center gap-2 text-slate-700 hover:text-black dark:text-slate-200 dark:hover:text-white">
                                <IoPersonRemoveOutline />
                                Delete account
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="mt-2 mb-1">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-slate-700 hover:text-black dark:text-slate-200 dark:hover:text-white">
                                <CiLogout />
                                Sign out
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )

    return (
        <header className="header flex items-center" ref={headerRef}>
            <div className="container">
                <div className="flex flex-row-reverse md:flex-row items-center justify-between">

                    {/* ===== Logo ===== */}
                    <div>
                        <img src={isDarkMode ? logoWhite : logoBlack} alt="" />
                    </div>

                    {/* ===== Navbar ===== */}
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <ul className="menu flex items-center gap-[2.7rem] shadow-2xl md:shadow-none dark:bg-slate-900 dark:md:bg-transparent">
                            {/* Login button & Profile info */}
                            {user && token ? (
                                <div className="md:hidden absolute top-[84px]">
                                    <Link to={`${role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`}>
                                        <div className="flex flex-col items-center gap-1 font-semibold">
                                            <figure>
                                                <img src={user?.photo || defaultAvatar} alt="" className="w-[45px] h-[45px] rounded-full object-cover border-2 border-slate-200 dark:border-slate-500" />
                                            </figure>
                                            <h2 className="text-center leading-6 text-textColor dark:text-slate-300 dark:hover:text-slate-100">
                                                {user?.name}
                                            </h2>
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <div className="md:hidden absolute top-[50px]">
                                    <Link to="/login">
                                        <button className="btn py-[6px] px-5 rounded-lg dark:bg-blue-700 dark:hover:bg-blue-800">
                                            Login
                                        </button>
                                    </Link>
                                </div>
                            )}
                            {/* Toggle theme */}
                            <div className="md:hidden absolute top-[28px]">
                                <input
                                    type="checkbox"
                                    id="toggleThemeButton"
                                    checked={isDarkMode}
                                    onChange={toggleTheme}
                                />
                            </div>
                            {/* Menu items */}
                            <div className="flex flex-col md:flex-row gap-4 md:gap-10 text-center">
                                {navLinks.map((link, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={link.path}
                                            className={navClass => navClass.isActive ?
                                                "text-primaryColor text-[16px] leading-7 font-[600] dark:text-blue-400" :
                                                "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor dark:text-slate-300 dark:hover:text-blue-400"}
                                        >
                                            {link.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </div>
                            {/* Logout button */}
                            {user !== null && (
                                <div className="md:hidden absolute bottom-12">
                                    <button
                                        onClick={handleLogout}
                                        className="w-28 flex items-center gap-2 bg-primaryColor text-white rounded-lg py-2 px-4 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                                    >
                                        <CiLogout /> Logout
                                    </button>
                                </div>
                            )}
                        </ul>
                    </div>

                    {/* ===== Right side ===== */}
                    <div className="flex items-center h-12 md:gap-5">
                        {/* Toggle theme */}
                        <div className="hidden md:flex items-center">
                            <input
                                type="checkbox"
                                id="toggleThemeButton"
                                checked={isDarkMode}
                                onChange={toggleTheme}
                            />
                        </div>
                        {/* Login button & Profile info */}
                        {user && token ? (
                            <div className="hidden md:block">
                                <Popover content={profileModal} trigger="hover">
                                    <div className="flex items-center gap-2 font-semibold h-14">
                                        <figure className="cursor-pointer">
                                            <img src={user?.photo || defaultAvatar} alt="" className="w-[45px] h-[45px] rounded-full object-cover border-2 border-slate-200 dark:border-slate-500" />
                                        </figure>
                                    </div>
                                </Popover>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="hidden bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] md:flex items-center justify-center rounded-[10px] hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                                    Login
                                </button>
                            </Link>
                        )}
                        {/* Hamburger button */}
                        <button className="md:hidden" onClick={toggleMenu}>
                            <BiMenu className="w-6 h-6 text-textColor hover:text-headingColor dark:text-slate-300 dark:hover:text-slate-100" />
                        </button>
                    </div>
                </div>
            </div >
        </header >
    )
}
