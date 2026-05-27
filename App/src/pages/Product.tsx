import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchProduct } from "../api/api";
import type { Product } from "../types/types";
import ProductsSpecs from '../components/Specs';
import { useState } from 'react';
import { SuspenseFallback } from "../components/SuspenseFallback";
import useCartStore from "../stores/store";

export default function Product() {
    const { id } = useParams();
    const numericID = Number(id);
    const { data: product, error, isLoading } = useQuery({
        queryKey: ['products', numericID],
        queryFn: () => fetchProduct(numericID),
        enabled: !isNaN(numericID)
    })
    const { addItem } = useCartStore();
    const [btnState, setButtonState] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState('description');
    const [quantity, setQuantity] = useState(1);

    if (isLoading) return <SuspenseFallback/>
    if (error) throw new Error(`Error with fetching product (id:${Number(id)})`)
    if (!product) throw new Error(`Error: product with id ${Number(id)} has not found`)

    const handleButtonClick = () => {
        addItem({...product, quantity: quantity})
        setButtonState(true)
    }

    return (
        <div className="min-h-screen bg-mauve-950 py-10 px-4 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 text-sm mb-8 text-mauve-500">
                    <a href="/" className="hover:text-emerald-400 transition-colors duration-300">Home</a>
                    <span>/</span>
                    <a href="/products" className="hover:text-emerald-400 transition-colors duration-300">Catalog</a>
                    <span>/</span>
                    <span className="text-mauve-300">{product.name}</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                    <div className="space-y-4">
                        <div className="bg-mauve-800 rounded-2xl overflow-hidden border border-mauve-700">
                            <img 
                                className="w-full h-96 object-cover" 
                                src={product.image} 
                                alt={product.name} 
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <p className="text-emerald-400 font-medium text-sm mb-2">{product.brand}</p>
                            <h1 className="text-mauve-100 font-bold text-3xl md:text-4xl mb-4">{product.name}</h1>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg 
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400' : 'fill-mauve-600'}`} 
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-mauve-300 font-medium">{product.rating}</span>
                                <span className="text-mauve-500">({product.reviews} reviews)</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-emerald-400 font-bold text-4xl">${product.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-yellow-500'}`}></div>
                            <span className={`font-medium ${product.inStock ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                {product.inStock ? 'In Stock' : 'Pre-order ( Ships in 2-3 weeks )'}
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-mauve-300 font-medium">Quantity:</span>
                                <div className="flex items-center gap-1 bg-mauve-800 rounded-lg border border-mauve-700">
                                    <button 
                                        className="w-10 h-10 flex items-center justify-center 
                                                   text-mauve-300 hover:text-emerald-400 hover:bg-mauve-700
                                                   rounded-l-lg transition-all duration-300
                                                   disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                                        </svg>
                                    </button>
                                    <span className="w-12 text-center text-mauve-100 font-semibold">{quantity}</span>
                                    <button 
                                        className="w-10 h-10 flex items-center justify-center 
                                                   text-mauve-300 hover:text-emerald-400 hover:bg-mauve-700
                                                   rounded-r-lg transition-all duration-300"
                                        onClick={() => setQuantity(q => q + 1)}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={handleButtonClick} className="flex-1 py-4 bg-linear-to-r from-emerald-800 to-green-700 
                                                   text-mauve-100 font-semibold text-lg rounded-xl
                                                   hover:from-green-700 hover:to-emerald-800
                                                   transition-all duration-300 hover:scale-[1.02]
                                                   flex items-center justify-center gap-2">
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
                                    </svg>
                                    {btnState === false ? `Add to Cart — ${(product.price * quantity).toFixed(2)}` : 'Added!'}
                                </button>
                                
                                <button className="w-14 h-14 bg-mauve-800 border border-mauve-700 rounded-xl
                                                   flex items-center justify-center
                                                   hover:border-emerald-700 hover:text-emerald-400
                                                   transition-all duration-300">
                                    <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-16">
                    <div className="flex border-b border-mauve-700 mb-8">
                        <button 
                            onClick={() => setActiveTab('description')}
                            className={`px-4 sm:px-6 py-3 font-semibold text-base sm:text-lg transition-all duration-300 border-b-2 
                                    ${activeTab === 'description' 
                                        ? 'border-emerald-500 text-emerald-400' 
                                        : 'border-transparent text-mauve-400 hover:text-mauve-300'}`}
                        >
                            Description
                        </button>
                        <button 
                            onClick={() => setActiveTab('specs')}
                            className={`px-4 sm:px-6 py-3 font-semibold text-base sm:text-lg transition-all duration-300 border-b-2 
                                    ${activeTab === 'specs' 
                                        ? 'border-emerald-500 text-emerald-400' 
                                        : 'border-transparent text-mauve-400 hover:text-mauve-300'}`}
                        >
                            Specs
                        </button>
                        <button 
                            onClick={() => setActiveTab('reviews')}
                            className={`hidden sm:block px-6 py-3 font-semibold text-lg transition-all duration-300 border-b-2 
                                    ${activeTab === 'reviews' 
                                        ? 'border-emerald-500 text-emerald-400' 
                                        : 'border-transparent text-mauve-400 hover:text-mauve-300'}`}
                        >
                            Reviews ({product.reviews})
                        </button>
                    </div>
                    
                    {activeTab === 'description' && (
                        <div className="bg-mauve-800 rounded-xl p-4 sm:p-6 border border-mauve-700">
                            <h2 className="text-mauve-100 font-bold text-xl sm:text-2xl mb-4">Product Description</h2>
                            <p className="text-mauve-300 leading-relaxed text-sm sm:text-base">{product.description}</p>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 fill-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span className="text-mauve-300 text-sm sm:text-base">Made from 100% recycled materials</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 fill-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span className="text-mauve-300 text-sm sm:text-base">Energy-efficient design</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 fill-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span className="text-mauve-300 text-sm sm:text-base">Biodegradable packaging</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 fill-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span className="text-mauve-300 text-sm sm:text-base">Repairable and upgradeable</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'specs' && (
                        <div className="bg-mauve-800 rounded-xl p-4 sm:p-6 border border-mauve-700">
                            <h2 className="text-mauve-100 font-bold text-xl sm:text-2xl mb-6">Technical Specifications</h2>
                            <ProductsSpecs product={product} />
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="bg-mauve-800 rounded-xl p-4 sm:p-6 border border-mauve-700">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                                <div>
                                    <h2 className="text-mauve-100 font-bold text-xl sm:text-2xl mb-2">Customer Reviews</h2>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-mauve-100 font-bold text-2xl sm:text-3xl">{product.rating}</span>
                                        <span className="text-mauve-400 text-sm sm:text-base">based on {product.reviews} reviews</span>
                                    </div>
                                </div>
                                <button className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-emerald-800 to-green-700 
                                                text-mauve-100 font-semibold rounded-xl
                                                hover:from-green-700 hover:to-emerald-800
                                                transition-all duration-300">
                                    Write a Review
                                </button>
                            </div>
                            <div className="border-t border-mauve-700 pt-6">
                                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                                    <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center shrink-0">
                                        <span className="text-mauve-100 font-bold">JD</span>
                                    </div>
                                    <div>
                                        <h4 className="text-mauve-100 font-semibold">John Doe</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-mauve-500 text-sm">2 weeks ago</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-mauve-300 text-sm sm:text-base sm:ml-14">
                                    Amazing eco-friendly product! The quality is outstanding and I love that it's made from recycled materials. 
                                    Highly recommend for anyone looking to reduce their carbon footprint.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="border-t border-mauve-700 pt-16">
                    <h2 className="text-mauve-100 font-bold text-3xl mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-mauve-800 rounded-xl h-64 border border-mauve-700 
                                                      animate-pulse flex items-center justify-center">
                                <span className="text-mauve-500">Similar Product</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}