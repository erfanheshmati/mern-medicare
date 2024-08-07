import { formateDate } from "../../../utils/formateDate"
import defaultAvatar from "/images/default-avatar.jpg"

export default function DoctorAppointments({ appointments }) {
    return (
        <div>
            {appointments.length !== 0 && (
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Gender
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Booked On
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments?.map((item) => (
                            <tr key={item._id}>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                    <img src={item.user?.photo || defaultAvatar} alt="" className="w-10 h-10 rounded-full" />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">
                                            {item.user.name}
                                        </div>
                                        <div className="text-normal text-gray-500">
                                            {item.user.email}
                                        </div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {item.user.gender}
                                </td>
                                <td className="px-6 py-4">
                                    {item.isPaid && (
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2">Paid</div>
                                        </div>
                                    )}
                                    {!item.isPaid && (
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2">Unpaid</div>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {item.ticketPrice}
                                </td>
                                <td className="px-6 py-4">
                                    {formateDate(item.createdAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {appointments.length === 0 && (
                <h2 className="mt-2 md:mt-0 text-center leading-7 text-[20px] font-semibold text-primaryColor dark:text-blue-100">
                    No user have booked an appointment.
                </h2>
            )}
        </div>
    )
}
