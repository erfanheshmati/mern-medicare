import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Services from "../components/services/Services"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Contact from "../components/Contact"
import DoctorDetails from "../components/doctors/DoctorDetails"
import FindDoctor from "../components/doctors/FindDoctor"
import PageNotFound from "../components/PageNotFound"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/doctors" element={<FindDoctor />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}
