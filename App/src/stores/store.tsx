import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, StoreType } from '../types/types';

const useCartStore = create<StoreType>()(
    persist(
        (set, get) => ({
            items: [],
            // Количество приходит параметром: со страницы товара человек мог
            // выбрать «3», но в корзину всё равно падала одна штука.
            addItem: (product: Product, quantity = 1) => {
                const amount = Math.max(1, Math.floor(quantity));
                const { items } = get();
                const currentItem = items.find(i => i.id === product.id)

                if (currentItem) {
                    set({
                        items: items.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + amount}
                                : item
                        ),
                    });
                } else {
                    set({
                        items : [...items, { ...product, quantity: amount}]
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
            // Корзина хранит копию товара целиком, поэтому после переименования
            // каталога и смены снимков в ней остались старые названия и битые
            // ссылки на картинки. Поднятая версия очищает такие корзины один раз.
            version: 1,
            migrate: () => ({ items: [] }) as Partial<StoreType>,
        }
    )
)

export default useCartStore;