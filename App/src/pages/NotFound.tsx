import { useLocation, Link } from "react-router";

export default function NotFound() {
    const path = useLocation();

    return (
        <div className="min-h-screen bg-mauve-950 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
            <div className="text-center max-w-lg">
                <h1 className="text-mauve-100 font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-3 sm:mb-4">
                    4<span className="text-emerald-400">0</span>4
                </h1>
                <h3 className="text-mauve-300 text-base sm:text-lg md:text-2xl mb-2">
                    Page Not Found
                </h3>
                <p className="text-mauve-400 text-sm sm:text-base mb-2 px-2">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <p className="text-mauve-500 text-xs sm:text-sm mb-6 sm:mb-8 break-all px-2">
                    URL: <span className="text-mauve-600">{path.pathname}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                    <Link to="/home" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 
                                        bg-linear-to-r from-emerald-800 to-green-700 
                                        text-mauve-100 font-semibold text-base sm:text-lg 
                                        rounded-xl cursor-pointer 
                                        transition-all duration-300 ease-in-out
                                        hover:from-green-700 hover:to-emerald-800 
                                        hover:scale-105 active:scale-95
                                        flex items-center justify-center gap-2">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}