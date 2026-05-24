import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/api";
import { Link } from "react-router";
import useCartStore from "../stores/store";
import type { Product } from "../types/types";
import { useState, useEffect } from "react";

export default function Catalog() {
    const { data: products, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts()
    })

    const [clicked, setClicked] = useState<number[]>([]);

    const { addItem, items } = useCartStore();

    // checking sum of items in cart
    useEffect(() => {
        console.log(items.length)
    }, [items.length])
    
    const handleCartAdding = async (p: Product, index: number) => {
        const newStates = [...clicked, index];
        setClicked(newStates)

        addItem(p)
    }

    if (isLoading) return <div>Loading...</div>
    if (error) throw new Error('Error of render products in catalog')

    return (
        <div>
            <h1>Catalog</h1>
            <div className="grid-cols-3 gap-5 grid w-1/2">
                {products?.map(product => (
                    <div className="bg-white p-3 rounded" key={product.id}>
                        <img className="h-48 w-72 rounded" src={`${product.image}`} alt={product.name} />
                        <div>
                            <h1>{product.name}</h1>
                            <h3>{product.price} $</h3>
                            <p>Rating: {product.rating}</p>
                            <p>{product.inStock ? 'Availeble' : 'For Order'}</p>
                        </div>
                        <div>
                            <Link to={`/products/${product.id}`}>
                                <button>
                                    Info
                                </button>
                            </Link>
                            {!clicked.includes(product.id) && 
                            <button onClick={() => handleCartAdding(product, product.id)}>
                                Add to Cart
                            </button>}
                            {clicked.includes(product.id) && <p>В Корзине!</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}