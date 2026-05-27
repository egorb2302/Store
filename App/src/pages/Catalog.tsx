import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/api";
import { Link, useSearchParams } from "react-router";
import useCartStore from "../stores/store";
import type { Category, Product } from "../types/types";
import { useState, useEffect, useRef } from "react";
import { SuspenseFallback } from "../components/SuspenseFallback";

export default function Catalog() {
    const { data: products, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts()
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const [getParams, setParams] = useState({ title: ''});
    const [clicked, setClicked] = useState<number[]>([]);
    const [category, setCategory] = useState<Category[]>([]);
    const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
    const { addItem, items } = useCartStore();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const title = searchParams.get('title') || '';

    useEffect(() => {
        console.log(items.length)
    }, [items.length])

    if (!products) return

    const categorySearch = (cat: Category) => {
        setCategory(prev => {
            if (prev.includes(cat)) {
                return prev.filter(c => c !== cat)
            } else {
                return [...prev, cat]
            }
        })
    }

    const filtredProducts = products.filter(p => {
        const titleMatch = title === '' || p.name.toLowerCase().includes(title.toLowerCase());
        const categoryMatch = category.length === 0 || category.includes(p.category);
        const stockMatch = !onlyInStock || p.inStock;
        
        return titleMatch && categoryMatch && stockMatch;
    })

    const updateFilter = (value: string) => {
        if (value === '') {
            setParams({ title: ''})
        } else {
            setParams({ title: value.toLowerCase() })
        }
    }

    const clearFilter = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        setSearchParams({})
    }
    
    const handleCartAdding = async (p: Product, index: number) => {
        const newStates = [...clicked, index];
        setClicked(newStates)

        addItem(p)
    }

    if (isLoading) return <SuspenseFallback/>
    if (error) throw new Error('Error of render products in catalog')

    return (
        <div>
            <div className="w-full bg-mauve-900 h-auto sm:h-16 flex flex-col sm:flex-row 
                    justify-center items-stretch sm:items-center gap-3 sm:gap-4 
                    px-3 sm:px-4 py-3 sm:py-0 border-b border-mauve-700">
                <div className="relative flex-1 sm:flex-none">
                    <input 
                        className="bg-mauve-800 border border-mauve-700 rounded-xl 
                                    pl-9 sm:pl-10 pr-4 sm:pr-5 py-2 w-full sm:w-64 md:w-80 lg:w-300
                                    text-mauve-200 placeholder-mauve-500 text-sm sm:text-base font-medium
                                    focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                                    transition-all duration-300"
                        ref={inputRef} 
                        type="text" 
                        placeholder="Search products..." 
                        onChange={(e) => updateFilter(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 sm:gap-3">
                    <button 
                        className="flex-1 sm:flex-none bg-linear-to-r from-emerald-800 to-green-700 text-mauve-100 
                                    font-semibold rounded-xl py-2 px-4 sm:px-5 cursor-pointer text-sm sm:text-base
                                    transition-all duration-300 hover:from-green-700 hover:to-emerald-800 
                                    hover:scale-105 active:scale-95"
                        onClick={() => setSearchParams(getParams)}
                    >
                        Search
                    </button>
                    
                    {getParams.title !== '' && 
                        <button 
                            className="flex-1 sm:flex-none bg-mauve-700 border-2 border-mauve-600 text-mauve-300 
                                        font-semibold rounded-xl py-2 px-3 sm:px-4 cursor-pointer text-sm sm:text-base
                                        hover:border-emerald-700 hover:text-emerald-400
                                        transition-all duration-300"
                            onClick={clearFilter}
                        >
                            Show All
                        </button>
                    }
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-40 px-4">
                <div className="bg-mauve-900 h-fit sm:w-60 mt-10 sm:mt-32 rounded-xl sticky top-5 
                                border border-mauve-700 p-5 w-full">
                    <h3 className="text-mauve-100 font-bold text-lg mb-4">Filters</h3>
                    <div className="space-y-3">
                        <h4 className="text-mauve-300 font-semibold text-sm uppercase tracking-wider">Category</h4>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-mauve-400 hover:text-emerald-400 
                                            transition-colors duration-300 cursor-pointer">
                                <input type="checkbox" className="accent-emerald-600" onChange={() => categorySearch('laptops')}/> Laptops
                            </label>
                            <label className="flex items-center gap-2 text-mauve-400 hover:text-emerald-400 
                                            transition-colors duration-300 cursor-pointer">
                                <input type="checkbox" className="accent-emerald-600" onChange={() => categorySearch('phones')}/> Phones
                            </label>
                            <label className="flex items-center gap-2 text-mauve-400 hover:text-emerald-400 
                                            transition-colors duration-300 cursor-pointer">
                                <input type="checkbox" className="accent-emerald-600" onChange={() => categorySearch('accesories')}/> Accesories
                            </label>
                            <label className="flex items-center gap-2 text-mauve-400 hover:text-emerald-400 
                                            transition-colors duration-300 cursor-pointer">
                                <input type="checkbox" className="accent-emerald-600" onChange={() => categorySearch('monitors')}/> Monitors
                            </label>
                            <label className="flex items-center gap-2 text-mauve-400 hover:text-emerald-400 
                                            transition-colors duration-300 cursor-pointer">
                                <input type="checkbox" className="accent-emerald-600" onChange={() => categorySearch('tablets')}/> Tablets
                            </label>
                            <label className="flex items-center gap-2 text-mauve-400 hover:text-emerald-400 
                                            transition-colors duration-300 cursor-pointer">
                                <input type="checkbox" className="accent-emerald-600" onChange={() => categorySearch('components')}/> Components
                            </label>
                        </div>
                    </div>
                    <div className="border-t border-mauve-700 my-4"></div>
                    <div className="space-y-3">
                        <h4 className="text-mauve-300 font-semibold text-sm uppercase tracking-wider">Availability</h4>
                        <label className="flex items-center gap-2 text-mauve-400 hover:text-emerald-400 
                                        transition-colors duration-300 cursor-pointer">
                            <input type="checkbox" className="accent-emerald-600" 
                            onChange={(e) => setOnlyInStock(e.target.checked)}/> In Stock
                        </label>
                    </div>
                    <div className="border-t border-mauve-700 my-4"></div>
                </div>
                <div className="flex-1 max-w-5xl">
                    <h1 className="font-bold text-5xl my-10 text-mauve-100 flex items-center gap-3">
                        Catalog
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtredProducts?.map(product => (
                            <div key={product.id} 
                                className="bg-mauve-800 rounded-xl overflow-hidden 
                                            border border-mauve-700 hover:border-emerald-700
                                            transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/20
                                            group">
                                <div className="relative overflow-hidden">
                                    <img 
                                        className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        src={`${product.image}`} 
                                        alt={product.name} 
                                    />
                                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                                                ${product.inStock 
                                                    ? 'bg-emerald-600/90 text-mauve-100' 
                                                    : 'bg-mauve-600/90 text-mauve-300'}`}>
                                        {product.inStock ? 'In Stock' : 'Pre-order'}
                                    </span>
                                </div>
                                <div className="p-5 flex flex-col justify-between h-50">
                                    <h2 className="text-mauve-100 font-bold text-lg mb-2 group-hover:text-emerald-400 
                                                transition-colors duration-300">
                                        {product.name}
                                    </h2>
                                    
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-emerald-400 font-bold text-2xl">
                                            ${product.price}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                            <span className="text-mauve-300 text-sm">{product.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link to={`/products/${product.id}`} className="flex-1">
                                            <button className="w-full py-2 px-3 bg-mauve-700 border border-mauve-600 
                                                            text-mauve-300 font-medium text-sm rounded-lg
                                                            hover:border-emerald-700 hover:text-emerald-400
                                                            transition-all duration-300">
                                                Details
                                            </button>
                                        </Link>
                                        
                                        {!clicked.includes(product.id) && 
                                            <button 
                                                className="flex-1 py-2 px-3 bg-linear-to-r from-emerald-800 to-green-700 
                                                        text-mauve-100 font-medium text-sm rounded-lg
                                                        hover:from-green-700 hover:to-emerald-800
                                                        transition-all duration-300 hover:scale-105"
                                                onClick={() => handleCartAdding(product, product.id)}
                                            >
                                                Add to Cart
                                            </button>
                                        }
                                        
                                        {clicked.includes(product.id) && 
                                            <div className="flex-1 py-2 px-3 bg-emerald-600/20 border border-emerald-600 
                                                            rounded-lg flex items-center justify-center gap-2">
                                                <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                                                    <path d="M5 13l4 4L19 7"/>
                                                </svg>
                                                <p className="text-emerald-400 font-medium text-sm">In Cart</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filtredProducts?.length === 0 && (
                        <div className="text-center py-20">
                            <svg className="w-20 h-20 fill-mauve-600 mx-auto mb-4" viewBox="0 0 24 24">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            <h3 className="text-mauve-400 text-xl mb-2">No products found</h3>
                            <p className="text-mauve-500">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}