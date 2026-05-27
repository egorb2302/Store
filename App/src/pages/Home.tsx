import { Link } from "react-router";

export default function Home() {
    return (
        <div className="flex flex-col items-center mx-4 sm:mx-6 lg:mx-10 my-6 sm:my-8 lg:my-10 
                bg-mauve-200 rounded-3xl sm:rounded-4xl 
                h-[60vh] sm:h-[80vh] lg:h-[83vh] justify-center px-4">
            <div className="border-b-4 sm:border-b-6 lg:border-b-8 border-emerald-900 
                            rounded-b-lg p-3 sm:p-4 lg:p-5 mb-10 sm:mb-16 lg:mb-20">
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center">
                    <span className="text-emerald-900">Green</span>
                    <span className="text-black">Tech.</span>
                </div>
            </div>
            <p className="font-semibold text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 lg:mb-10 text-center px-2">
                See our catalog there!
            </p>
            <Link to="/products" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto py-6.5 sm:py-3 px-6 sm:px-8 lg:px-10 
                                bg-linear-to-r from-emerald-800 to-green-700 
                                text-mauve-200 text-xl sm:text-base font-semibold 
                                rounded-xl sm:rounded-2xl cursor-pointer 
                                transition-all duration-300 
                                hover:brightness-90 active:brightness-75 active:scale-105">
                    Catalog
                </button>
            </Link>
        </div>
    )
}