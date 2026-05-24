import { NavLink, Outlet } from "react-router";

export default function HeaderLayout() {
    return (
        <>
            <header className="w-full flex h-18 justify-center items-center bg-amber-50">
                <h1 className="text-emerald-900 font-bold text-4xl mr-50">Logo.</h1>
                <nav className="mx-20 flex gap-10">
                    <NavLink to="/home"><p className="font-semibold text-xl">Home</p></NavLink>
                    <NavLink to="/products"><p className="font-semibold text-xl">Catalog</p></NavLink>
                    <NavLink to="/about"><p className="font-semibold text-xl">About</p></NavLink>
                    <NavLink to="/cart"><p className="font-semibold text-xl">Cart</p></NavLink>
                </nav>
                <h2 className="mx-10">Icons</h2> 
                <div className="flex gap-3 ml-20">
                    <button className="px-4 py-2 rounded-xl bg-black text-mist-50 font-semibold cursor-pointer">
                        Login
                    </button>
                    <button className="px-4 py-1 rounded-xl bg-green-800 text-mist-50 font-semibold cursor-pointer">
                        Sign Up
                    </button>
                </div>   
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}