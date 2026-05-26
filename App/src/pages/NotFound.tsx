import { useLocation, Link } from "react-router";

export default function NotFound() {
    const path = useLocation();

    return (
        <div className="min-h-screen bg-mauve-950 flex items-center justify-center py-12 px-4">
            <div className="text-center max-w-lg">
                <h1 className="text-mauve-100 font-bold text-8xl md:text-9xl mb-4">
                    4<span className="text-emerald-400">0</span>4
                </h1>
                <h3 className="text-mauve-300 text-lg md:text-2xl mb-2">
                    Page Not Found
                </h3>
                <p className="text-mauve-400 mb-2">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <p className="text-mauve-500 text-sm mb-8 break-all">
                    URL: <span className="text-mauve-600">{path.pathname}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/home">
                        <button className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-emerald-800 to-green-700 
                                        text-mauve-100 font-semibold text-lg rounded-xl cursor-pointer 
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