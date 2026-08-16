import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import AuthLayout from '../components/AuthLayout';
import { Button } from '../components/ui/button';
import { Field, Input } from '../components/ui/field';
import { addUser } from '../api/api';
import type { User } from '../types/types';

// Список требований под полем раньше обещал восемь символов, заглавную и
// цифру, а схема пропускала любые пять. Здесь одно правило и одна подпись.
const signUpSchema = z
    .object({
        name: z.string().min(2, 'At least two characters'),
        email: z.string().min(1, 'Enter your email').email('That does not look like an email'),
        password: z.string().min(5, 'At least five characters'),
        confirmPass: z.string().min(1, 'Repeat the password'),
    })
    .refine((data) => data.password === data.confirmPass, {
        message: 'The two passwords do not match',
        path: ['confirmPass'],
    });

type SignUpForm = z.infer<typeof signUpSchema>;

/** localStorage переживает вкладку — идентификатор должен быть настоящим. */
function newUserId() {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `u_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export default function SignUp({ onSignUp }: { onSignUp: (data: User) => void }) {
    const [formError, setFormError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpForm>({ resolver: zodResolver(signUpSchema) });
    const nav = useNavigate();

    const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
        setFormError(null);
        // Раньше id брался из useId() — это идентификатор узла в дереве React
        // («:r3:»), одинаковый у всех, кто зарегистрировался на той же странице.
        const user: User = { id: newUserId(), name: data.name, email: data.email, password: data.password };

        try {
            await addUser(user);
            onSignUp(user);
            nav('/profile');
        } catch (error) {
            console.error(error);
            setFormError('We could not create the account. That email may already be taken');
        }
    };

    return (
        <AuthLayout
            eyebrow="Create account"
            title="Join GreenTech"
            lede="Track your orders and see what your choices add up to"
            aside="Compare devices on more than price"
            footer={
                <>
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-moss underline underline-offset-4">
                        Sign in
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <Field label="Full name" error={errors.name?.message}>
                    {(props) => (
                        <Input {...props} {...register('name')} autoComplete="name" placeholder="John Doe" />
                    )}
                </Field>

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

                <Field label="Password" hint="At least five characters" error={errors.password?.message}>
                    {(props) => (
                        <Input
                            {...props}
                            {...register('password')}
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                        />
                    )}
                </Field>

                <Field label="Repeat password" error={errors.confirmPass?.message}>
                    {(props) => (
                        <Input
                            {...props}
                            {...register('confirmPass')}
                            type="password"
                            autoComplete="new-password"
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
                    {isSubmitting ? 'Creating the account…' : 'Create account'}
                </Button>
            </form>
        </AuthLayout>
    );
}
