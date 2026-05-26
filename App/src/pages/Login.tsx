import { useForm } from "react-hook-form";
import useAuthStore from "../stores/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "../types/types";
import { fetchUser } from "../api/api";

const userSchema = z.object({
    name: z.string().min(2, '2 is min length of name'),
    email: z.string().email('Uncorrect email format'),
    password: z.string().min(5, '5 is minimum length of name'),
    confirmPass: z.string()
}).refine(data => data.password === data.confirmPass, {
    message: 'Passwords is not same', path: ['confirmPass']
})

type UserFormTypes = z.infer<typeof userSchema>

export default function Login({ onLogin }: { onLogin: () => void }) {
    const { setUser } = useAuthStore();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserFormTypes>({
        resolver: zodResolver(userSchema)
    });

    const onSubmit = async (data: User) => {
        const currentUser = await fetchUser(data.id)
        if (data.password !== data.confirmPass) return
        
        setUser(data)
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name:</label>
                    <input {...register('name')} />
                </div>
                {errors.name && <p>{errors.name.message}</p>}
                <div>
                    <label>Email:</label>
                    <input {...register('email')} />
                </div>
                {errors.email && <p>{errors.email.message}</p>}
                <div>
                    <label>Phone:</label>
                    <input {...register('password')} />
                </div>
                {errors.password && <p>{errors.password.message}</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Regiister...' : 'Login'}
                </button>
            </form>
        </div>
    )
}