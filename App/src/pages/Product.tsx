import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchProduct } from "../api/api";
import type { Product } from "../types/types";
import ProductsSpecs from '../components/Specs';

export default function Product() {
    const { id } = useParams();
    const numericID = Number(id);
    const { data: product, error, isLoading } = useQuery({
        queryKey: ['products', numericID],
        queryFn: () => fetchProduct(numericID),
        enabled: !isNaN(numericID)
    })

    if (isLoading) return <div>Loading...</div>
    if (error) throw new Error(`Error with fetching product (id:${Number(id)})`)
    if (!product) throw new Error(`Error: product with id ${Number(id)} has not found`)

    return (
        <div key={product.id}>
            <img src={`${product.image}`} alt={`${product.name}`} />
            <div>
                <h1>{product.name}</h1>
                <p>Brand: {product.brand}</p>
                <h3>{product.price}</h3>
                <p>{product.inStock ? 'Availeble' : 'For Order'}</p>
                <div>
                    <button>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div>
                <h2>Ratings \ Reviews</h2>
                <h3>{product.rating}</h3>
                <p>{product.reviews}</p>
            </div>
            <div>
                <h2>Description & Specs</h2>
                <p>{product.description}</p>
                <h3>Specs</h3>
                {<ProductsSpecs product={product}/>}
            </div>
        </div>
    )
}