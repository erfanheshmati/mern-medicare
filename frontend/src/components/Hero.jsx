import heroImg1 from "../assets/images/hero-img01.png"
import heroImg2 from "../assets/images/hero-img02.png"
import heroImg3 from "../assets/images/hero-img03.png"

export default function Hero() {
    return (
        <section className="hero__section pt-[60px] 2xl:h-[800px]">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
                    {/* Content */}
                    <div>
                        <div className="lg:w-[570px]">
                            <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                                We help patients live a healthy, longer life.
                            </h1>
                            <p className="text__para">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, facilis ut. Iure optio inventore, explicabo tempora ex cumque aliquid impedit modi, voluptatibus facilis eligendi soluta dolorum asperiores praesentium hic et.
                            </p>
                            <button className="btn">
                                Request an Appointment
                            </button>
                        </div>
                        {/* Counter */}
                        <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                            <div>
                                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                                    15+
                                </h2>
                                <span className="w-[80px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                                <p className="text__para">Clinic Location</p>
                            </div>
                            <div>
                                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                                    30+
                                </h2>
                                <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                                <p className="text__para">Years of Experience</p>
                            </div>
                            <div>
                                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                                    100%
                                </h2>
                                <span className="w-[120px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                                <p className="text__para">Patient Satisfaction</p>
                            </div>
                        </div>
                    </div>
                    {/* Image */}
                    <div className="flex gap-[30px] justify-end">
                        <div>
                            <img src={heroImg1} alt="" className="w-full" />
                        </div>
                        <div className="mt-[30px]">
                            <img src={heroImg2} alt="" className="w-full mb-[30px]" />
                            <img src={heroImg3} alt="" className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
