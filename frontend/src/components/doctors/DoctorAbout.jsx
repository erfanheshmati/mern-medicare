import { formateDate } from "../../utils/formateDate"

export default function DoctorAbout({ name, qualifications, experiences, about }) {
    return (
        <div>
            <div className="mt-8">
                <h3 className="text-[20px] text-headingColor font-semibold flex items-center gap-2 dark:text-slate-300">
                    About of
                    <span className="text-irisBlueColor font-bold text-[20px]">
                        {name}
                    </span>
                </h3>
                <p className="text__para">
                    {about || "Empty"}
                </p>
            </div>
            <div className="mt-8">
                <h3 className="text-[20px] text-headingColor font-semibold dark:text-slate-300">
                    Educations
                </h3>
                <ul className="pt-3 space-y-3">
                    {qualifications?.map((item, index) => (
                        <li key={index} className="flex flex-col">
                            <div>
                                <span className="text-irisBlueColor text-[15px] font-semibold">
                                    {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                                </span>
                                <p className="text-[16px] font-medium text-textColor dark:text-slate-400">
                                    {item.degree}
                                </p>
                            </div>
                            <p className="text-[14px] font-medium text-textColor dark:text-slate-400">
                                {item.university}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-8">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold dark:text-slate-300">
                    Experiences
                </h3>
                <ul className="grid sm:grid-cols-2 gap-[20px] pt-4">
                    {experiences?.map((item, index) => (
                        <li key={index} className="p-4 rounded bg-[#fff9ea]">
                            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                                {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                            </span>
                            <p className="text-[16px] leading-5 font-medium text-textColor">
                                {item.position}
                            </p>
                            <p className="text-[14px] leading-5 font-medium text-textColor">
                                {item.hospital}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
