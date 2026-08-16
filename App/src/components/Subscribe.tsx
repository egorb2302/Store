import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { sendEmail } from '../api/api';
import SuccessModal from './SuccesModal';

// Раньше поле было optional: пустая форма считалась валидной и уходила на сервер.
const subscribeSchema = z.object({
    email: z.string().min(1, 'Enter an email address').email('That does not look like an email'),
});

type SubscribeMailType = z.infer<typeof subscribeSchema>;

export default function Subscribe() {
    const [modalState, setModalState] = useState(false);
    const [failed, setFailed] = useState(false);
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SubscribeMailType>({ resolver: zodResolver(subscribeSchema) });

    const onSubmit = async (data: SubscribeMailType) => {
        setFailed(false);
        try {
            await sendEmail(data);
            setModalState(true);
            reset();
        } catch (error) {
            console.error(error);
            setFailed(true);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4" noValidate>
                <label htmlFor="subscribe-email" className="sr-only">
                    Email address
                </label>
                <div className="flex gap-2">
                    <input
                        id="subscribe-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email || failed ? 'subscribe-message' : undefined}
                        className="min-w-0 flex-1 rounded-full border border-paper/25 bg-paper/8 px-4 py-2.5 text-sm text-paper placeholder:text-paper/60 transition-colors duration-200 hover:border-paper/45 focus:border-sprout aria-[invalid=true]:border-rust"
                        {...register('email')}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-sprout text-pine transition-colors duration-200 hover:bg-paper disabled:opacity-55"
                        aria-label={isSubmitting ? 'Subscribing' : 'Subscribe'}
                    >
                        <ArrowRight className="h-5 w-5" aria-hidden />
                    </button>
                </div>
                {(errors.email || failed) && (
                    <p id="subscribe-message" className="mt-2 text-sm text-rust">
                        {errors.email?.message ?? 'Could not save that address. Try again in a moment'}
                    </p>
                )}
            </form>
            <SuccessModal
                state={modalState}
                message="You're on the restock list. Watch your inbox"
                onClose={() => setModalState(false)}
            />
        </>
    );
}
