import { convertTime } from "../../utils/convertTime";
import { BASE_URL, token } from "../../config.js"
import { toast } from "react-toastify"

export default function SidePanel({ doctorId, ticketPrice, timeSlots }) {

    const bookingHandler = async () => {
        try {
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message + "Please try again.")
            if (data.session.url) window.location.href = data.session.url
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="p-4 lg:p-5 rounded-md shadow-2xl dark:bg-slate-600">
            <div>
                <p className="text__para font-semibold text-headingColor dark:text-slate-300">
                    Available time slots:
                </p>
                <ul className="mt-3">
                    {timeSlots?.map((item, index) => (
                        <li key={index} className="flex items-center justify-between mb-2">
                            <p className="text-[15px] leading-6 text-textColor font-semibold dark:text-slate-400">
                                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                            </p>
                            <p className="text-[15px] leading-6 text-textColor font-semibold dark:text-slate-400">
                                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center justify-between mt-4">
                <p className="text__para mt-0 font-semibold text-headingColor dark:text-slate-300">
                    Ticket price:
                </p>
                <span className="text-[18px] mt-3 md:mt-0 lg:text-[20px] lg:leading-8 text-textColor font-bold dark:text-slate-400">
                    ${ticketPrice}
                </span>
            </div>
            <button
                onClick={bookingHandler}
                className="btn px-2 w-full"
            >
                Book appointment
            </button>
        </div>
    )
}
