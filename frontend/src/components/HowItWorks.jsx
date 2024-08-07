import icon1 from "/images/icon01.png"
import icon2 from "/images/icon02.png"
import icon3 from "/images/icon03.png"

export default function HowItWorks() {
    return (
        <section>
            <div className="container">
                <div className="lg:w-[470px] mx-auto">
                    <h2 className="heading text-center">
                        Providing the best medical services
                    </h2>
                    <p className="text__para text-center">
                        World-class care for everyone. Our health system offers unmatched, expert health care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                    <div className="py-[30px] px-5">
                        <div className="flex items-center justify-center">
                            <img src={icon1} alt="" />
                        </div>
                        <div className="mt-[30px]">
                            <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center dark:text-slate-300">
                                Find a Doctor
                            </h2>
                            <p className="text-[16px] leading-7 text-headingColor font-[400px] mt-4 text-center dark:text-slate-400">
                                World-class care for everyone. Our health system offers unmatched, expert health care.
                            </p>
                        </div>
                    </div>
                    <div className="py-[30px] px-5">
                        <div className="flex items-center justify-center">
                            <img src={icon2} alt="" />
                        </div>
                        <div className="mt-[30px]">
                            <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center dark:text-slate-300">
                                Find a Location
                            </h2>
                            <p className="text-[16px] leading-7 text-headingColor font-[400px] mt-4 text-center dark:text-slate-400">
                                World-class care for everyone. Our health system offers unmatched, expert health care.
                            </p>
                        </div>
                    </div>
                    <div className="py-[30px] px-5">
                        <div className="flex items-center justify-center">
                            <img src={icon3} alt="" />
                        </div>
                        <div className="mt-[30px]">
                            <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center dark:text-slate-300">
                                Book Appointment
                            </h2>
                            <p className="text-[16px] leading-7 text-headingColor font-[400px] mt-4 text-center dark:text-slate-400">
                                World-class care for everyone. Our health system offers unmatched, expert health care.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
