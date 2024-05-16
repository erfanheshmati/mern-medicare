import { formateDate } from "../../utils/formateDate"

export default function DoctorAbout() {
    return (
        <div>
            <div>
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
                    About of
                    <span className="text-irisBlueColor font-bold text-[20px] leading-9">
                        Muhibur Rahman
                    </span>
                </h3>
                <p className="text__para">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel inventore quis minima minus tempora alias quaerat odio unde dolorem eligendi optio architecto quos pariatur, dicta, nulla officia iusto tenetur quasi.
                </p>
            </div>
            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
                    Education
                </h3>
                <ul className="pt-4 md:p-5">
                    <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                        <div>
                            <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                                {formateDate("06-23-2004")} - {formateDate("12-19-2008")}
                            </span>
                            <p className="text-[16px] leading-6 font-medium text-textColor">
                                PHD in Surgeon
                            </p>
                        </div>
                        <p className="text-[14px] leading-5 font-medium text-textColor">
                            New Apollo Hospital, New York.
                        </p>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                        <div>
                            <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                                {formateDate("12-04-2010")} - {formateDate("02-05-2012")}
                            </span>
                            <p className="text-[16px] leading-6 font-medium text-textColor">
                                Specialist in Surgeon
                            </p>
                        </div>
                        <p className="text-[14px] leading-5 font-medium text-textColor">
                            New Apollo Hospital, New York.
                        </p>
                    </li>
                </ul>
            </div>
            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
                    Experience
                </h3>
                <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                    <li className="p-4 rounded bg-[#fff9ea]">
                        <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                            {formateDate("02-06-2012")} - {formateDate("02-05-2014")}
                        </span>
                        <p className="text-[16px] leading-5 font-medium text-textColor">
                            Sr. Surgeon
                        </p>
                        <p className="text-[14px] leading-5 font-medium text-textColor">
                            New Apollo Hospital, New York.
                        </p>
                    </li>
                    <li className="p-4 rounded bg-[#fff9ea]">
                        <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                            {formateDate("02-06-2014")} - {formateDate("02-05-2022")}
                        </span>
                        <p className="text-[16px] leading-5 font-medium text-textColor">
                            Ex. Surgeon
                        </p>
                        <p className="text-[14px] leading-5 font-medium text-textColor">
                            New Apollo Hospital, New York.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
