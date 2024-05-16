import { doctors } from "../../assets/data/doctors"
import DoctorCard from "./DoctorCard"
import Testimonial from "../Testimonial"

export default function FindDoctor() {
    return (
        <>
            <section className="pb-10">
                <div className="container text-center">
                    <h2 className="heading">
                        Find a Doctor
                    </h2>
                    <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                        <input
                            type="search"
                            placeholder="Search for doctors..."
                            className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none placeholder:text-textColor"
                        />
                        <button className="btn mt-0 rounded-[0px] rounded-r-md">
                            Search
                        </button>
                    </div>
                </div>
            </section>

            <section className="pt-5 pb-16">
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {doctors.map((doctor) => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>
                </div>
            </section>

            <Testimonial />
        </>
    )
}
