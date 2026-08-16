import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import CartOrder from '../components/CartOrder';
import { EcoStrip } from '../components/EcoLabel';
import { Button } from '../components/ui/button';
import { buttonVariants } from '../components/ui/button-variants';
import { ecoRating } from '../lib/eco';
import { cn, formatPrice } from '../lib/utils';
import useCartStore from '../stores/store';

const FREE_SHIPPING_AT = 500;

export default function Cart() {
    const { items, removeItem, clearCart, getTotalItems, getTotalPrice, updateQuantity } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
                <p className="eyebrow text-bark">Cart</p>
                <h1 className="mt-4 text-4xl font-extrabold text-pine sm:text-5xl">Nothing here yet</h1>
                <p className="mt-4 max-w-sm text-bark">
                    Pick a device from the catalog. Every one of them comes with its GreenTech Index
                </p>
                <Link to="/products" className={cn(buttonVariants({ size: 'lg' }), 'mt-8')}>
                    Browse the catalog
                </Link>
            </div>
        );
    }

    const total = getTotalPrice();
    const remainingForFree = Math.max(0, FREE_SHIPPING_AT - total);

    return (
        <div className="wrap py-12 sm:py-16">
            <header className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="eyebrow text-bark">Cart</p>
                    <h1 className="mt-3 text-4xl font-extrabold text-pine sm:text-5xl">Your cart</h1>
                </div>
                <p className="font-mono text-sm text-bark">
                    {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </p>
            </header>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
                <div>
                    <p
                        className={cn(
                            'rounded-inset border px-5 py-4 text-sm',
                            remainingForFree === 0
                                ? 'border-moss/30 bg-moss/8 text-moss'
                                : 'border-fibre bg-pulp text-bark',
                        )}
                    >
                        {remainingForFree === 0
                            ? 'Shipping is on us, carbon-neutral delivery included'
                            : `Add ${formatPrice(remainingForFree)} more for free shipping`}
                    </p>

                    <ul className="mt-6 divide-y divide-fibre border-y border-fibre">
                        {items.map((item) => {
                            const rating = ecoRating(item);
                            return (
                                <li key={item.id} className="flex gap-4 py-6 sm:gap-6">
                                    <Link
                                        to={`/products/${item.id}`}
                                        className="h-24 w-24 shrink-0 overflow-hidden rounded-inset border border-fibre bg-pulp sm:h-28 sm:w-28"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </Link>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <p className="eyebrow text-bark-soft">{item.brand}</p>
                                                <h2 className="mt-1 text-lg font-bold leading-snug text-pine">
                                                    <Link
                                                        to={`/products/${item.id}`}
                                                        className="transition-colors duration-200 hover:text-moss"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </h2>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-bark-soft transition-colors duration-200 hover:bg-rust/10 hover:text-rust"
                                                aria-label={`Remove ${item.name} from cart`}
                                            >
                                                <Trash2 className="h-4 w-4" aria-hidden />
                                            </button>
                                        </div>

                                        <EcoStrip rating={rating} className="mt-3 max-w-52" />

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center rounded-full border border-fibre bg-pulp">
                                                <button
                                                    type="button"
                                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-pine transition-colors duration-200 hover:text-moss disabled:opacity-40"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                >
                                                    <Minus className="h-4 w-4" aria-hidden />
                                                </button>
                                                <span className="w-9 text-center font-mono text-pine">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-pine transition-colors duration-200 hover:text-moss"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                >
                                                    <Plus className="h-4 w-4" aria-hidden />
                                                </button>
                                            </div>
                                            <p className="font-mono text-xl text-pine">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link to="/products" className={buttonVariants({ variant: 'outline' })}>
                            Keep shopping
                        </Link>
                        <Button variant="danger" onClick={clearCart}>
                            Empty the cart
                        </Button>
                    </div>
                </div>

                <aside className="lg:sticky lg:top-28 lg:h-fit">
                    <div className="tex-pulp rounded-card border border-fibre bg-pulp p-6 sm:p-7">
                        <h2 className="text-2xl font-bold text-pine">Checkout</h2>

                        <dl className="mt-6 space-y-3 border-b border-fibre pb-5 font-mono text-sm">
                            <div className="flex justify-between">
                                <dt className="text-bark">Subtotal</dt>
                                <dd className="text-pine">{formatPrice(total)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-bark">Shipping</dt>
                                <dd className="text-pine">
                                    {remainingForFree === 0 ? 'Free' : formatPrice(19)}
                                </dd>
                            </div>
                        </dl>

                        <div className="flex items-baseline justify-between py-5">
                            <span className="font-display text-lg font-bold text-pine">Total</span>
                            <span className="font-mono text-3xl font-medium text-pine">
                                {formatPrice(remainingForFree === 0 ? total : total + 19)}
                            </span>
                        </div>

                        <CartOrder cartItems={items} />
                    </div>
                </aside>
            </div>
        </div>
    );
}
