import { Link } from "react-router";

export default function Home() {
    return (
        <div className="flex flex-col items-center m-10 bg-mauve-200 rounded-4xl h-[83vh] justify-center">
            <div className="border-b-8 border-emerald-900 rounded-b-lg p-5 mb-20">
                <h1 className="text-9xl font-bold"><span className="text-emerald-900">Green</span>Tech.</h1>
            </div>
            <p className="font-semibold text-2xl mb-10">See our catalog there!</p>
            <Link to="/products">
                <button className="py-3 px-10 bg-linear-to-r from-emerald-800 to-green-700 
                text-mauve-200 font-semibold rounded-2xl cursor-pointer 
                transition-all duration-300 hover:brightness-80 active:brightness-60 active:scale-105">
                    Catalog
                </button>
            </Link>
        </div>
    )
}