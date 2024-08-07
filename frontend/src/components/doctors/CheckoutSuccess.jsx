export default function CheckoutSuccess() {
    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6 md:mx-auto">
                <svg></svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thanks for completing your secure online payment.
                    </p>
                    <p>Have a great day!</p>
                    <div className="py-10 text-center">
                        <Link
                            to="/home"
                            className="px-12 text-white bg-primaryColor font-semibold py-3"
                        >
                            Go back to home page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
