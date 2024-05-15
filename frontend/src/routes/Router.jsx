import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Services from "../components/Services"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Contact from "../components/Contact"
import Doctors from "../components/Doctors"
import DoctorDetails from "../components/DoctorDetails"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
        </Routes>
    )
}
