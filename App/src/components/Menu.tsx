import { NavLink } from 'react-router';
import useAuthStore from '../stores/auth';

export default function DropdownMenu({state}: {state:boolean}) {   
    const { isAuth } = useAuthStore()
    if (state === false) return null

    return (
        <div className="absolute top-full right-3 mt-2 bg-mauve-900 border border-mauve-700 
                rounded-xl shadow-2xl p-4 min-w-50 z-50
                animate-[fadeIn_0.2s_ease-out]">
            <nav className="flex flex-col gap-2 mb-2">
                <NavLink to="/home" 
                    className="text-mauve-300 hover:text-emerald-400 hover:bg-mauve-800 
                                font-semibold text-base sm:text-lg px-4 py-2
                                transition-all duration-300 border-b-2">
                    Home
                </NavLink>
                <NavLink to="/products" 
                    className="text-mauve-300 hover:text-emerald-400 hover:bg-mauve-800 
                                font-semibold text-base sm:text-lg px-4 py-2
                                transition-all duration-300 border-b-2">
                    Catalog
                </NavLink>
                <NavLink to="/about" 
                    className="text-mauve-300 hover:text-emerald-400 hover:bg-mauve-800 
                                font-semibold text-base sm:text-lg px-4 py-2
                                transition-all duration-300 border-b-2">
                    About
                </NavLink>
            </nav>
            {!isAuth ? (
                <>
                    <NavLink to="/login">
                        <button className="px-5 py-2 rounded-xl border-2 border-mauve-600 
                                        hover:border-emerald-700 hover:text-emerald-400
                                        text-mauve-300 font-semibold cursor-pointer
                                        transition-all duration-300 mr-2">
                            Login
                        </button>
                    </NavLink>
                    <NavLink to="/signup">
                        <button className="px-5 py-2 rounded-xl bg-linear-to-r from-emerald-800 to-green-700 
                                        text-mauve-100 font-semibold cursor-pointer
                                        hover:from-green-700 hover:to-emerald-800
                                        transition-all duration-300 hover:scale-105
                                        border-2 border-emerald-950">
                            Sign Up
                        </button>
                    </NavLink>
                </>
                ) : (
                    <NavLink to="/profile">
                        <button className="px-5 py-2 rounded-xl bg-linear-to-r from-emerald-800 to-green-700 
                                        text-mauve-100 font-semibold cursor-pointer
                                        hover:from-green-700 hover:to-emerald-800
                                        transition-all duration-300 hover:scale-105 w-full">
                            Profile
                        </button>
                    </NavLink>
                )}
        </div>
    )
}