import { NavLink, Outlet } from "react-router";
import cartIcon from '../assets/shopping-cart.svg';
import useCartStore from "../stores/store";

export default function HeaderLayout() {
    const { getTotalItems } = useCartStore();

    return (
        <>
            <header className="w-full flex items-center justify-between h-20 px-6 md:px-10 lg:px-20 
                   bg-mauve-900 border-b-2 border-emerald-800">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        <span className="text-emerald-400">Green</span>
                        <span className="text-mauve-100">Tech.</span>
                    </h1>
                </div>
                <nav className="hidden lg:flex gap-8">
                    <NavLink to="/home" 
                    className="text-mauve-300 hover:text-emerald-400 font-semibold text-lg 
                    transition-colors duration-300">
                        Home
                    </NavLink>
                    <NavLink to="/products" 
                    className="text-mauve-300 hover:text-emerald-400 font-semibold text-lg 
                    transition-colors duration-300">
                        Catalog
                    </NavLink>
                    <NavLink to="/about" 
                    className="text-mauve-300 hover:text-emerald-400 font-semibold text-lg 
                    transition-colors duration-300">
                        About
                    </NavLink>
                </nav>
                <div className="flex items-center gap-4 md:gap-6">
                    <NavLink to="/cart" className="relative group">
                        <img className="filter invert sepia hue-rotate-90 h-7" src={cartIcon} alt="" />
                        {getTotalItems() > 0 && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full 
                                            flex items-center justify-center text-xs font-bold text-white">
                                {getTotalItems()}
                            </span>
                        )}
                    </NavLink>
                    <div className="hidden md:flex gap-3">
                        <button className="px-5 py-2 rounded-xl border-2 border-mauve-600 
                                        text-mauve-300 font-semibold cursor-pointer
                                        hover:border-emerald-700 hover:text-emerald-400
                                        transition-all duration-300">
                            Login
                        </button>
                        <button className="px-5 py-2 rounded-xl bg-linear-to-r from-emerald-800 to-green-700 
                                        text-mauve-100 font-semibold cursor-pointer
                                        hover:from-green-700 hover:to-emerald-800
                                        transition-all duration-300 hover:scale-105">
                            Sign Up
                        </button>
                    </div>
                    <button className="lg:hidden p-2">
                        <svg className="w-6 h-6 fill-mauve-300" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer className="bg-mauve-900 text-mauve-300">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-40 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-3xl font-bold text-emerald-800">
                                    GreenTech
                                </span>
                            </div>
                            <p className="text-mauve-400 text-sm leading-relaxed mb-4">
                                Sustainable technology for a better future. We make eco-friendly tech 
                                accessible to everyone while protecting our planet.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-mauve-100 font-semibold text-lg mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li className="hover:text-emerald-400 transition-colors duration-300 text-sm">
                                    <NavLink to="/about">
                                        About us
                                    </NavLink>
                                </li>
                                <li className="hover:text-emerald-400 transition-colors duration-300 text-sm">
                                    <NavLink to="/products">
                                        Catalog
                                    </NavLink>
                                </li>
                                <li className="hover:text-emerald-400 transition-colors duration-300 text-sm">
                                    <NavLink to="/home">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="hover:text-emerald-400 transition-colors duration-300 text-sm">
                                    <NavLink to="/cart">
                                        Cart
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Контакты и подписка */}
                        <div>
                            <h3 className="text-mauve-100 font-semibold text-lg mb-4">Stay Connected</h3>
                            <div className="space-y-2 mb-4">
                                <p className="flex items-center gap-2 text-sm text-mauve-400">
                                    <svg className="w-4 h-4 fill-emerald-500" viewBox="0 0 24 24">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    742 Evergreen St, Greenland, OR 00000
                                </p>
                                <p className="flex items-center gap-2 text-sm text-mauve-400">
                                    <svg className="w-4 h-4 fill-emerald-500" viewBox="0 0 24 24">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                                    </svg>
                                    8 (998)-248-67-67
                                </p>
                                <p className="flex items-center gap-2 text-sm text-mauve-400">
                                    <svg className="w-4 h-4 fill-emerald-500" viewBox="0 0 24 24">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                    egorb2302@greentechstore.com
                                </p>
                            </div>
                            {/* Подписка на рассылку */}
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="flex-1 px-3 py-2 bg-mauve-800 border border-mauve-700 rounded-lg 
                                            text-mauve-200 text-sm placeholder-mauve-500
                                            focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                                />
                                <button className="py-2 px-4 bg-linear-to-r from-emerald-800 to-green-700 
                                                text-mauve-200 text-sm font-semibold rounded-lg cursor-pointer 
                                                transition-all duration-300 hover:from-green-700 hover:to-emerald-800">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Нижняя полоса */}
                    <div className="border-t border-mauve-700 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-mauve-400 text-sm">
                                © 2026 GreenTech. All rights reserved.
                            </p>
                            <div className="flex gap-6">
                                <a href="#" className="text-mauve-400 hover:text-emerald-400 text-sm transition-colors duration-300">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-mauve-400 hover:text-emerald-400 text-sm transition-colors duration-300">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-mauve-400 hover:text-emerald-400 text-sm transition-colors duration-300">
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    )
}