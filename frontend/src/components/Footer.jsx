import { Link } from "react-router-dom"
import logo from "../assets/images/logo.png"
import { RiLinkedinFill } from "react-icons/ri"
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from "react-icons/ai"

const socialLinks = [
    { path: "/", icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" /> },
    { path: "/", icon: <AiFillGithub className="group-hover:text-white w-4 h-5" /> },
    { path: "/", icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" /> },
    { path: "/", icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" /> },
]

const quickLinks1 = [
    { path: "/home", display: "Home" },
    { path: "/", display: "About US" },
    { path: "/services", display: "Services" },
    { path: "/", display: "Blog" },
]

const quickLinks2 = [
    { path: "/doctors", display: "Find a Doctor" },
    { path: "/", display: "Book an Appointment" },
    { path: "/", display: "Find a Location" },
    { path: "/", display: "Get a Opinion" },
]

const quickLinks3 = [
    { path: "/", display: "Donate" },
    { path: "/contact", display: "Contact US" },
]

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer className="py-16 footer">
            <div className="container">
                <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">

                    <div>
                        <img src={logo} alt="" />
                        <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
                            Copyright &copy; {year} Developed by Erfan Heshmati. All rights reserved.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            {socialLinks.map((link, index) => (
                                <Link
                                    to={link.path}
                                    key={index}
                                    className="w-9 h-9 border border-solid border-[#181a1e] rounded-full flex items-center justify-center hover:bg-primaryColor hover:border-none hover:text-white"
                                >
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                            Quick Links
                        </h2>
                        <ul>
                            {quickLinks1.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor">
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                            I want to
                        </h2>
                        <ul>
                            {quickLinks2.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor">
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                            Support
                        </h2>
                        <ul>
                            {quickLinks3.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor">
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    )
}
