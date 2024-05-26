import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Services from "../components/services/Services"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Contact from "../components/Contact"
import DoctorDetails from "../components/doctors/DoctorDetails"
import FindDoctor from "../components/doctors/FindDoctor"
import PageNotFound from "../components/PageNotFound"
import UserAccount from "../pages/dashboard/UserAccount"
import DoctorAccount from "../pages/dashboard/DoctorAccount"
import ProtectedRouter from "./ProtectedRouter"

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
            <Route path="/users/profile/me" element={<ProtectedRouter allowedRoles={["patient"]}><UserAccount /></ProtectedRouter>} />
            <Route path="/doctors/profile/me" element={<ProtectedRouter allowedRoles={["doctor"]}><DoctorAccount /></ProtectedRouter>} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}
