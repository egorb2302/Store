import { useNavigate } from "react-router";
import useAuthStore from "../stores/auth";
import { Link } from 'react-router';

export default function Profile({ onLogout }: { onLogout: () => void }) {
    const { user } = useAuthStore();
    const nav = useNavigate();
    
    const handleLogout = () => {
        onLogout()
        nav('/home')
    }
    
    if (!user) throw new Error('User not found')

    return (
        <div className="min-h-screen bg-mauve-950 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 text-sm mb-8 text-mauve-500">
                    <Link to="/" className="hover:text-emerald-400 transition-colors duration-300">Home</Link>
                    <span>/</span>
                    <span className="text-mauve-300">Profile</span>
                </div>
                <div className="mb-10">
                    <h1 className="text-mauve-100 font-bold text-4xl mb-2">My Profile</h1>
                    <p className="text-mauve-400">Manage your account and eco-preferences</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-mauve-900 rounded-2xl border border-mauve-700 p-8 text-center">
                            <div className="w-32 h-32 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4
                                            border-4 border-emerald-700">
                                <span className="text-mauve-100 text-5xl font-bold">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </span>
                            </div>
                            <h2 className="text-mauve-100 font-bold text-2xl mb-1">
                                {user?.name || 'User'}
                            </h2>
                            <p className="text-mauve-400 text-sm mb-6">{user?.email}</p>
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="text-emerald-400 text-sm font-medium">Active Account</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-mauve-800 rounded-xl p-3">
                                    <p className="text-emerald-400 font-bold text-xl">12</p>
                                    <p className="text-mauve-400 text-xs">Orders</p>
                                </div>
                                <div className="bg-mauve-800 rounded-xl p-3">
                                    <p className="text-emerald-400 font-bold text-xl">5</p>
                                    <p className="text-mauve-400 text-xs">Reviews</p>
                                </div>
                                <div className="bg-mauve-800 rounded-xl p-3">
                                    <p className="text-emerald-400 font-bold text-xl">250</p>
                                    <p className="text-mauve-400 text-xs">Green Points</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="w-full py-3 px-6 bg-mauve-800 border-2 border-red-500/30 
                                        text-red-400 font-semibold rounded-xl cursor-pointer 
                                        transition-all duration-300
                                        hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300
                                        active:scale-95
                                        flex items-center justify-center gap-2"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-mauve-900 rounded-2xl border border-mauve-700 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-mauve-100 font-bold text-2xl">Personal Information</h2>
                                <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300
                                transition-colors duration-300 cursor-pointer">
                                    Edit
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-mauve-400 text-sm mb-1 block">Full Name</label>
                                    <div className="flex items-center gap-3 p-4 bg-mauve-800 rounded-xl border border-mauve-700">
                                        <svg className="w-5 h-5 fill-mauve-500 shrink-0" viewBox="0 0 24 24">
                                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                        </svg>
                                        <span className="text-mauve-200 font-medium">
                                            {user?.name || 'Not specified'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-mauve-400 text-sm mb-1 block">Email Address</label>
                                    <div className="flex items-center gap-3 p-4 bg-mauve-800 rounded-xl border border-mauve-700">
                                        <svg className="w-5 h-5 fill-mauve-500 shrink-0" viewBox="0 0 24 24">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                            <polyline points="22,6 12,13 2,6"/>
                                        </svg>
                                        <span className="text-mauve-200 font-medium line-clamp-1">{user?.email}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-mauve-400 text-sm mb-1 block">User ID</label>
                                    <div className="flex items-center gap-3 p-4 bg-mauve-800 rounded-xl border border-mauve-700">
                                        <svg className="w-5 h-5 fill-mauve-500 shrink-0" viewBox="0 0 24 24">
                                            <path d="M10 13a2 2 0 110-4 2 2 0 010 4zm0 0a5 5 0 015 5v1H5v-1a5 5 0 015-5z"/>
                                        </svg>
                                        <span className="text-mauve-200 font-medium text-sm">{user?.id}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-mauve-400 text-sm mb-1 block">Password</label>
                                    <div className="flex items-center gap-3 p-4 bg-mauve-800 rounded-xl border border-mauve-700">
                                        <svg className="w-5 h-5 fill-mauve-500 shrink-0" viewBox="0 0 24 24">
                                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                        </svg>
                                        <span className="text-mauve-200 font-medium">••••••••</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-linear-to-r from-emerald-800 to-green-700 rounded-2xl p-8 text-center">
                            <h3 className="text-mauve-100 font-bold text-2xl mb-2">Your Green Impact</h3>
                            <p className="text-emerald-200 mb-4">You've saved 45 kg of CO₂ by choosing eco-friendly products!</p>
                            <div className="flex justify-center gap-8">
                                <div>
                                    <p className="text-mauve-100 font-bold text-3xl">12</p>
                                    <p className="text-emerald-200 text-sm">Trees Planted</p>
                                </div>
                                <div>
                                    <p className="text-mauve-100 font-bold text-3xl">250</p>
                                    <p className="text-emerald-200 text-sm">Green Points</p>
                                </div>
                                <div>
                                    <p className="text-mauve-100 font-bold text-3xl">5</p>
                                    <p className="text-emerald-200 text-sm">Badges Earned</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}