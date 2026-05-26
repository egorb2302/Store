import { useEffect } from "react";
import CartOrder from "../components/CartOrder";
import useCartStore from "../stores/store";
import { Link } from 'react-router';
import X from '../assets/x.svg';

export default function Cart() {
    const { items, removeItem, clearCart, 
        getTotalItems, getTotalPrice, updateQuantity } = useCartStore();

    useEffect(() => {
        console.log(items.length)
    }, [items.length])

    if (items.length <= 0) {
        return (
            <div className="h-[70vh]">
                <div className="flex flex-col items-center">
                    <h1 className="text-white text-6xl font-bold cursor-default mt-40 mb-20">Your Cart is Empty!</h1>
                    <Link to="/products">
                        <button className="py-3 px-10 bg-linear-to-r from-emerald-800 to-green-700 
                        text-mauve-200 font-semibold rounded-2xl cursor-pointer 
                        transition-all duration-300 hover:brightness-80 active:brightness-60 active:scale-105 shadow-xl">
                            Catalog
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-8 bg-mauve-900 py-10 
        px-6 md:px-10 lg:px-20 my-10 mx-4 md:mx-10 lg:mx-30 rounded-2xl">
            <div className="w-full lg:w-3/5">
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-mauve-100 font-bold text-2xl md:text-3xl">Your Cart</h1>
                </div>
                <div className="bg-mauve-800 px-5 py-3 rounded-t-xl border border-mauve-700 flex items-center justify-between">
                    <p className="text-mauve-300 font-medium">
                        Items: <span className="text-emerald-400 font-bold">{getTotalItems()}</span>
                    </p>
                    <p className="text-mauve-500 text-sm">Free shipping on orders over $500</p>
                </div>
                <div className="border-x border-mauve-700">
                    {items.map((item, index) => (
                            <div 
                                key={item.id} 
                                className={`p-5 bg-mauve-800 hover:bg-mauve-750 transition-colors duration-300
                                        ${index === 0 ? 'border-t border-mauve-700' : ''}
                                        ${index !== items.length - 1 ? 'border-b border-mauve-700' : ''}`}
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h2 className="text-mauve-100 font-bold text-lg md:text-xl mb-1">
                                                {item.name}
                                            </h2>
                                            <p className="text-mauve-400 text-sm">Eco-friendly product</p>
                                        </div>
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="group p-2 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                                        >
                                            <img className="filter invert sepia hue-rotate-90 cursor-pointer" src={X} alt="" />
                                        </button>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <h3 className="text-emerald-400 font-bold text-2xl">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </h3>
                                        <div className="flex items-center gap-1 bg-mauve-900 rounded-lg border border-mauve-700">
                                            <button 
                                                className="w-10 h-10 flex items-center justify-center 
                                                        text-mauve-300 hover:text-emerald-400 hover:bg-mauve-700
                                                        rounded-l-lg transition-all duration-300
                                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                                                </svg>
                                            </button>
                                            
                                            <span className="w-12 text-center text-mauve-100 font-semibold">
                                                {item.quantity}
                                            </span>
                                            
                                            <button 
                                                className="w-10 h-10 flex items-center justify-center 
                                                        text-mauve-300 hover:text-emerald-400 hover:bg-mauve-700
                                                        rounded-r-lg transition-all duration-300"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
                <div className="bg-mauve-800 px-5 py-4 rounded-b-xl border border-mauve-700 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-mauve-300 font-medium">Total:</p>
                        <p className="text-emerald-400 font-bold text-2xl">${getTotalPrice().toFixed(2)}</p>
                    </div>
                    
                    <div className="flex gap-3">
                        <button 
                            className="flex-1 py-3 px-6 bg-mauve-700 border-2 border-mauve-600 
                                    text-mauve-300 font-semibold rounded-xl cursor-pointer 
                                    transition-all duration-300 ease-in-out
                                    hover:border-red-500/50 hover:text-red-400 hover:bg-mauve-600
                                    active:scale-95"
                            onClick={() => clearCart()}
                        >
                            Clear Cart
                        </button>
                        <Link to="/products">
                            <button 
                                className="flex-1 py-3 px-6 bg-mauve-700 border-2 border-mauve-600 
                                        text-mauve-300 font-semibold rounded-xl cursor-pointer 
                                        transition-all duration-300 ease-in-out
                                        hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-mauve-600
                                        active:scale-95"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-2/5">
                <CartOrder cartItems={items} />
            </div>
        </div>
    )
}