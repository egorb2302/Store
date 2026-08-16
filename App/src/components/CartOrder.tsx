import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { Lock } from 'lucide-react';
import useCartStore from '../stores/store';
import { addOrder, removeProduct } from '../api/api';
import type { Product } from '../types/types';
import { Button } from './ui/button';
import { Field, Input } from './ui/field';
import SuccessModal from './SuccesModal';

const orderSchema = z.object({
    name: z.string().min(2, 'Enter the name for the delivery'),
    email: z.string().min(1, 'Enter your email').email('That does not look like an email'),
    phone: z.string().min(10, 'Include the area code, at least 10 digits'),
});

type OrderForm = z.infer<typeof orderSchema>;

export default function CartOrder({ cartItems }: { cartItems: Product[] }) {
    const [done, setDone] = useState(false);
    const [failed, setFailed] = useState(false);
    const { clearCart } = useCartStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<OrderForm>({ resolver: zodResolver(orderSchema) });

    const onSubmit = async (data: OrderForm) => {
        setFailed(false);
        try {
            // Порядок важен: сначала фиксируем заказ, и только потом снимаем
            // товары с витрины. Раньше удаление шло первым, и сбой при
            // создании заказа оставлял магазин без товара и без заказа.
            await Promise.all(cartItems.map((item) => addOrder(item)));
            await Promise.all(cartItems.map((item) => removeProduct(item.id)));

            console.info('Order placed for', data.email);
            clearCart();
            reset();
            setDone(true);
        } catch (error) {
            console.error(error);
            setFailed(true);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <Field label="Name" error={errors.name?.message}>
                    {(props) => <Input {...props} {...register('name')} autoComplete="name" />}
                </Field>

                <Field label="Email" hint="The receipt and tracking go here" error={errors.email?.message}>
                    {(props) => (
                        <Input {...props} {...register('email')} type="email" autoComplete="email" />
                    )}
                </Field>

                <Field label="Phone" error={errors.phone?.message}>
                    {(props) => <Input {...props} {...register('phone')} type="tel" autoComplete="tel" />}
                </Field>

                {failed && (
                    <p className="rounded-inset border border-rust/30 bg-rust/5 p-4 text-sm text-rust">
                        The order did not go through. Nothing was charged, so try again in a moment
                    </p>
                )}

                <Button type="submit" size="lg" variant="moss" className="w-full" disabled={isSubmitting}>
                    <Lock className="h-4 w-4" aria-hidden />
                    {isSubmitting ? 'Placing the order…' : 'Place the order'}
                </Button>

                <p className="text-center text-xs text-bark-soft">
                    Carbon-neutral delivery, free over $500
                </p>
            </form>

            <SuccessModal
                state={done}
                message="Your order is in. We'll email the tracking number once it ships"
                onClose={() => setDone(false)}
            />
        </>
    );
}
