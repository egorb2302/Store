import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCartStore from "../stores/store";
import { useMutation } from "@tanstack/react-query";
import { removeProduct } from "../api/api";
import type { Product } from '../types/types';

const orderSchema = z.object({
    name: z.string().min(2, 'Min length of name is 2 spells'),
    email: z.string().email('Uncorrect format of email'),
    phone: z.string().min(10, 'Min length of phone number is 10')
})

type OrderForm = z.infer<typeof orderSchema>;

export default function CartOrder() {
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<OrderForm>({
        resolver: zodResolver(orderSchema)
    })

    const { items, clearCart } = useCartStore();

    const mutate = useMutation({
        mutationKey: ['products'],
        mutationFn: () => removeFromBD(items)
    })

    const removeFromBD = async (items: Product[]): Promise<void> => {
        items.forEach(item => {
            removeProduct(item.id)
        });
        clearCart()
    }

    const onSubmit = async (data: OrderForm) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        mutate.mutate();
        console.log('Form data: ' + JSON.stringify(data))
        alert('Ordering is succesful!');
    }

    return (
        <div>
            <h1>Order</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name:</label>
                    <input {...register('name')} />
                </div>
                {errors.name && <p>{errors.name.message}</p>}
                <div>
                    <label>Phone:</label>
                    <input {...register('phone')} />
                </div>
                {errors.phone && <p>{errors.phone.message}</p>}
                <div>
                    <label>Email:</label>
                    <input {...register('email')} />
                </div>
                {errors.email && <p>{errors.email.message}</p>}
                <button type="submit">
                    {isSubmitting ? 'Ordering...' : 'Order'}
                </button>
            </form>
            {errors.form && <p>{errors.form.message}</p>}
        </div>
    )
}