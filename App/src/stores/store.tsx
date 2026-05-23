import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, StoreType } from '../types/types';

const useCartStore = create<StoreType>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product: Product) => {
                const { items } = get();
                const currentItem = items.find(i => i.id === product.id)

                if (currentItem) {
                    set({
                        items: items.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1}
                                : item
                        ),
                    });
                } else {
                    set({
                        items : [...items, { ...product, quantity: 1}]
                    })
                }
            },
            removeItem: (id: number) => {
                const { items } = get();
                set({
                    items: items.filter(p => p.id !== id)
                })
            },
            updateQuantity: (id: number, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(id)
                    return
                }

                set({
                    items: get().items.map(item => {
                        if (item.id === id) {
                            return { ...item, quantity}
                        } else {
                            return item
                        }
                    })
                })
            },
            clearCart: () => {
                set({
                    items: []
                })
            },
            getTotalItems: () => {
                return get().items.reduce((total, item) =>
                    total + (item.quantity), 0
                )
            },
            getTotalPrice: () => {
                return get().items.reduce((total, item) => 
                    total + (item.price * item.quantity), 0
                )
            }
        }),
        {
            name: 'cart-storage',
        }
    )
)

export default useCartStore;