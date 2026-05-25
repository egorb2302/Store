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
            <h1 className="text-mauve-200 font-bold text-3xl mb-5">Order</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="text-mauve-600 text-sm font-medium">Name:</label>
                    <input className="w-full px-4 py-3 bg-mauve-800 border border-mauve-700 rounded-xl 
               text-mauve-200 placeholder-mauve-500 font-semibold
               focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
               transition-all duration-300" {...register('name')} />
                </div>
                {errors.name && <p>{errors.name.message}</p>}
                <div className="mb-3">
                    <label className="text-mauve-600 text-sm font-medium">Phone:</label>
                    <input className="w-full px-4 py-3 bg-mauve-800 border border-mauve-700 rounded-xl 
               text-mauve-200 placeholder-mauve-500 font-semibold
               focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
               transition-all duration-300" {...register('phone')} />
                </div>
                {errors.phone && <p>{errors.phone.message}</p>}
                <div className="mb-3">
                    <label className="text-mauve-600 text-sm font-medium">Email:</label>
                    <input className="w-full px-4 py-3 bg-mauve-800 border border-mauve-700 rounded-xl 
               text-mauve-200 placeholder-mauve-500 font-semibold
               focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
               transition-all duration-300" {...register('email')} />
                </div>
                {errors.email && <p>{errors.email.message}</p>}
                <button className="w-full py-3 px-6 bg-linear-to-r from-emerald-800 to-green-700 
                   text-mauve-200 font-semibold rounded-xl cursor-pointer 
                   transition-all duration-300 ease-in-out
                   hover:bg-linear-to-l hover:from-green-700 hover:to-emerald-800 
                   hover:scale-[1.02] active:scale-95 mt-7.5" type="submit">
                    {isSubmitting ? 'Ordering...' : 'Order'}
                </button>
            </form>
            {errors.form && <p>{errors.form.message}</p>}
        </div>
    )
}