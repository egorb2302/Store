import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser } from "../api/api";
import { useId } from "react";
import type { User } from "../types/types";
import { useNavigate, Link } from "react-router";


const userSchema = z.object({
    name: z.string().min(2, '2 is min length of name'),
    email: z.string().email('Uncorrect email format'),
    password: z.string().min(5, '5 is minimum length of name'),
    confirmPass: z.string()
}).refine(data => data.password === data.confirmPass, {
    message: 'Passwords is not same', path: ['confirmPass']
})

type UserFormTypes = z.infer<typeof userSchema>

export default function SignUp({ onSignUp }: { onSignUp: (data: User) => void }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserFormTypes>({
        resolver: zodResolver(userSchema)
    });
    const ID = useId();
    const nav = useNavigate();

    const onSubmit: SubmitHandler<UserFormTypes> = async (data) => {
        if (data.password !== data.confirmPass) return 

        addUser({...data, id: ID})
        onSignUp({...data, id: ID})
        nav('/login')
    }


    return (
        <div className="min-h-screen bg-mauve-950 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-mauve-100 font-bold text-3xl mb-2">Create Account</h1>
                    <p className="text-mauve-400">Join the eco-friendly tech community</p>
                </div>
                <div className="bg-mauve-900 rounded-2xl border border-mauve-700 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-mauve-300 text-sm font-medium">
                                Full Name
                            </label>
                            <div className="relative">
                                <input 
                                    {...register('name')} 
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full pl-5 pr-4 py-3 bg-mauve-800 border border-mauve-600 rounded-xl 
                                            text-mauve-200 placeholder-mauve-500
                                            focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                                            transition-all duration-300 mt-2"
                                />
                            </div>
                            {errors.name && (
                                <p className="flex items-center gap-1 text-red-400 text-sm">
                                    <svg className="w-4 h-4 fill-red-400" viewBox="0 0 24 24">
                                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-mauve-300 text-sm font-medium">
                                Email Address
                            </label>
                            <div className="relative">
                                <input 
                                    {...register('email')} 
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full pl-5 pr-4 py-3 bg-mauve-800 border border-mauve-600 rounded-xl 
                                            text-mauve-200 placeholder-mauve-500
                                            focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                                            transition-all duration-300 mt-2"
                                />
                            </div>
                            {errors.email && (
                                <p className="flex items-center gap-1 text-red-400 text-sm">
                                    <svg className="w-4 h-4 fill-red-400" viewBox="0 0 24 24">
                                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-mauve-300 text-sm font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <input 
                                    {...register('password')} 
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-5 pr-4 py-3 bg-mauve-800 border border-mauve-600 rounded-xl 
                                            text-mauve-200 placeholder-mauve-500
                                            focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                                            transition-all duration-300 mt-2"
                                />
                            </div>
                            {errors.password && (
                                <p className="flex items-center gap-1 text-red-400 text-sm">
                                    <svg className="w-4 h-4 fill-red-400" viewBox="0 0 24 24">
                                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-mauve-300 text-sm font-medium">
                                Repeat password
                            </label>
                            <div className="relative">
                                <input 
                                    {...register('confirmPass')} 
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-5 pr-4 py-3 bg-mauve-800 border border-mauve-600 rounded-xl 
                                            text-mauve-200 placeholder-mauve-500
                                            focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                                            transition-all duration-300 mt-2"
                                />
                            </div>
                            {errors.confirmPass && (
                                <p className="flex items-center gap-1 text-red-400 text-sm">
                                    <svg className="w-4 h-4 fill-red-400" viewBox="0 0 24 24">
                                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {errors.confirmPass.message}
                                </p>
                            )}
                        </div>
                        <div className="bg-mauve-800 rounded-xl p-4 border border-mauve-700">
                            <p className="text-mauve-400 text-xs font-medium mb-2">Password must contain:</p>
                            <ul className="space-y-1">
                                <li className="flex items-center gap-2 text-mauve-500 text-xs">
                                    <svg className="w-3 h-3 fill-mauve-600" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10"/>
                                    </svg>
                                    At least 8 characters
                                </li>
                                <li className="flex items-center gap-2 text-mauve-500 text-xs">
                                    <svg className="w-3 h-3 fill-mauve-600" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10"/>
                                    </svg>
                                    One uppercase letter
                                </li>
                                <li className="flex items-center gap-2 text-mauve-500 text-xs">
                                    <svg className="w-3 h-3 fill-mauve-600" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10"/>
                                    </svg>
                                    One number
                                </li>
                            </ul>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full py-4 bg-linear-to-r from-emerald-800 to-green-700 
                                    text-mauve-100 font-semibold text-lg rounded-xl cursor-pointer 
                                    transition-all duration-300 ease-in-out
                                    hover:from-green-700 hover:to-emerald-800 
                                    hover:scale-[1.02] active:scale-95
                                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                                    flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Account'}
                        </button>
                    </form>
                </div>
                <p className="text-center mt-8 text-mauve-400">
                    Already have an account?{' '}
                    <Link 
                        to="/login" 
                        className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors duration-300"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}