import { useEffect } from "react";
import CartOrder from "../components/CartOrder";
import useCartStore from "../stores/store";
import { Link } from 'react-router';

export default function Cart() {
    const { items, removeItem, clearCart, 
        getTotalItems, getTotalPrice, updateQuantity } = useCartStore();

    // check sum of items in cart
    useEffect(() => {
        console.log(items.length)
    }, [items.length])

    if (items.length <= 0) {
        return (
            <div>
                <h1>Your Cart is Empty!</h1>
                <p>Add some products in cart</p>
                <Link to="/products">
                    <button>
                        Catalog
                    </button>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex-wrap flex gap-20">
            <div>
                <h1>All your products</h1>
                <div>
                    {items.map(item => (
                        <div key={item.id}>
                            <div>
                                <h1>{item.name}</h1>
                                <h3>{`${item.price * item.quantity} $`}</h3>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            </div>
                            <button onClick={() => removeItem(item.id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>
                        <p>Items: {`${getTotalItems()}`}</p>
                        <p>Total: {`${getTotalPrice()} $`}</p>
                    </h2>
                </div>
                <button onClick={() => clearCart()}>
                    Clear Cart
                </button>
            </div>
            {<CartOrder/>}
        </div>
    )
}