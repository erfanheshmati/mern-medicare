import { NavLink, Link } from "react-router-dom"
import logo from "../assets/images/logo.png"
import defaultAvatar from "../assets/images/default-avatar.jpg"
import { BiMenu } from "react-icons/bi"
import { useContext, useEffect, useRef } from "react"
import { authContext } from "../context/AuthContext"

const navLinks = [
    {
        path: "/home",
        display: "Home"
    },
    {
        path: "/doctors",
        display: "Find a Doctor"
    },
    {
        path: "/services",
        display: "Services"
    },
    {
        path: "/contact",
        display: "Contact"
    },
]

export default function Header() {

    const headerRef = useRef(null)
    const menuRef = useRef(null)

    const { user, token, role } = useContext(authContext)

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

    return (
        <header className="header flex items-center" ref={headerRef}>
            <div className="container">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div>
                        <img src={logo} alt="" />
                    </div>
                    {/* Menu */}
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <ul className="menu flex items-center gap-[2.7rem]">
                            <div className="md:hidden absolute top-8">
                                <Link to={`${role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`}>
                                    <div className="flex flex-col items-center gap-2">
                                        <figure className="w-[40px] h-[40px] rounded-full cursor-pointer">
                                            <img src={user?.photo || defaultAvatar} alt="" className="w-[40px] h-[40px] rounded-full" />
                                        </figure>
                                        <h2>
                                            {user?.name}
                                        </h2>
                                    </div>
                                </Link>
                            </div>
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        className={navClass => navClass.isActive ?
                                            "text-primaryColor text-[16px] leading-7 font-[600]" :
                                            "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"}
                                    >
                                        {link.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Nav Right */}
                    <div className="flex items-center gap-4">
                        {user && token ? (
                            <div className="hidden md:block">
                                <Link to={`${role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`}>
                                    <div className="flex items-center gap-2">
                                        <figure className="w-[40px] h-[40px] rounded-full cursor-pointer">
                                            <img src={user?.photo || defaultAvatar} alt="" className="w-[40px] h-[40px] rounded-full" />
                                        </figure>
                                        <h2>
                                            {user?.name}
                                        </h2>
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] hover:bg-blue-700">
                                    Login
                                </button>
                            </Link>
                        )}
                        <span className="md:hidden" onClick={toggleMenu}>
                            <BiMenu className="w-6 h-6 cursor-pointer" />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}
