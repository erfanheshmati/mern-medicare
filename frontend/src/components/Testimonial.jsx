import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import patientAvatar from "../assets/images/patient-avatar.png"
import { HiStar } from "react-icons/hi"

const testimonials = [
    { id: 1, name: "Muhibur Rahman", avatar: patientAvatar, rate: 4, opinion: "I have taken medical services from them. They treat so well and they are providing the best medical services." },
    { id: 2, name: "Mahmud Fakour", avatar: patientAvatar, rate: 5, opinion: "I have taken medical services from them. They treat so well and they are providing the best medical services." },
    { id: 3, name: "Arthur Bachan", avatar: patientAvatar, rate: 3, opinion: "I have taken medical services from them. They treat so well and they are providing the best medical services." },
    { id: 4, name: "Karim Adnan", avatar: patientAvatar, rate: 3, opinion: "I have taken medical services from them. They treat so well and they are providing the best medical services." },
    { id: 5, name: "Mostafa Khalid", avatar: patientAvatar, rate: 4, opinion: "I have taken medical services from them. They treat so well and they are providing the best medical services." },
]

export default function Testimonial() {
    return (
        <section>
            <div className="container">
                <div className="xl:w-[470px] mx-auto">
                    <h2 className="heading text-center">
                        What our patients say
                    </h2>
                    <p className="text__para text-center">
                        World-class care for everyone. Our health system offers unmatched, expert health care.
                    </p>
                </div>
                <div>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 0
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }}
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="py-[30px] px-5 rounded-[13px]">
                                    <div className="flex items-center gap-[13px]">
                                        <img src={testimonial.avatar} alt="" />
                                        <div>
                                            <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                                {testimonial.name}
                                            </h4>
                                            <div className="flex items-center gap-[2px]">
                                                {testimonial.rate == 5 ? (
                                                    <>
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                    </>
                                                ) : testimonial.rate == 4 ? (
                                                    <>
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                    </>
                                                ) : testimonial.rate == 3 ? (
                                                    <>
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                    </>
                                                ) : testimonial.rate == 2 ? (
                                                    <>
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                        <HiStar className="text-yellowColor w-4 h-4" />
                                                    </>
                                                ) : <HiStar className="text-yellowColor w-4 h-4" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                        "{testimonial.opinion}"
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}
