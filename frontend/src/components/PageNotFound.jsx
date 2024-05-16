import { Link } from "react-router-dom"
import pageNotFound from "../assets/images/404.png"

export default function PageNotFound() {
    return (
        <section className="mb-10 xl:mb-0">
            <div className="flex flex-col items-center justify-center">
                <img src={pageNotFound} alt="" className="w-fit md:w-[75%] lg:w-[55%] xl:w-[35%] 2xl:w-[40%]" />
                <button className="btn">
                    <Link to="/home">Back to Home</Link>
                </button>
            </div>
        </section>
    )
}
