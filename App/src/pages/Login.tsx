import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import AuthLayout from '../components/AuthLayout';
import { Button } from '../components/ui/button';
import { Field, Input } from '../components/ui/field';
import { fetchUsers } from '../api/api';
import type { User } from '../types/types';

const loginSchema = z.object({
    email: z.string().min(1, 'Enter your email').email('That does not look like an email'),
    password: z.string().min(1, 'Enter your password'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login({ onLogin }: { onLogin: (data: User) => void }) {
    const [formError, setFormError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
    const nav = useNavigate();

    // Раньше все три исхода уходили в console.log: человек жал «Войти»,
    // ничего не происходило, и понять почему было нельзя.
    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        setFormError(null);
        try {
            const users = await fetchUsers();
            const currentUser = users.find((user) => user.email === data.email);

            if (!currentUser || currentUser.password !== data.password) {
                setFormError('That email and password do not match an account');
                return;
            }

            onLogin(currentUser);
            nav('/profile');
        } catch (error) {
            console.error(error);
            setFormError('We could not reach the account service. Try again in a moment');
        }
    };

    return (
        <AuthLayout
            eyebrow="Sign in"
            title="Welcome back"
            lede="Your orders, your saved devices and your green impact"
            aside="Every device we sell is scored on the same three criteria"
            footer={
                <>
                    No account yet?{' '}
                    <Link to="/signup" className="font-medium text-moss underline underline-offset-4">
                        Create one
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <Field label="Email" error={errors.email?.message}>
                    {(props) => (
                        <Input
                            {...props}
                            {...register('email')}
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                        />
                    )}
                </Field>

                <Field
                    label="Password"
                    error={errors.password?.message}
                    action={
                        <a href="#" className="text-sm text-moss underline underline-offset-4">
                            Forgot password?
                        </a>
                    }
                >
                    {(props) => (
                        <Input
                            {...props}
                            {...register('password')}
                            type="password"
                            autoComplete="current-password"
                            placeholder="••••••••"
                        />
                    )}
                </Field>

                {formError && (
                    <p role="alert" className="rounded-inset border border-rust/30 bg-rust/5 p-4 text-sm text-rust">
                        {formError}
                    </p>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in…' : 'Sign in'}
                </Button>
            </form>
        </AuthLayout>
    );
}
