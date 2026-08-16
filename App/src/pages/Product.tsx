import { useQuery } from '@tanstack/react-query';
import { Check, ChevronRight, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { fetchProduct, fetchProducts } from '../api/api';
import { EcoAxis, EcoBreakdown, EcoScale, EcoStamp } from '../components/EcoLabel';
import ProductCard from '../components/ProductCard';
import ProductSpecs from '../components/Specs';
import { SuspenseFallback } from '../components/SuspenseFallback';
import { Button } from '../components/ui/button';
import { buttonVariants } from '../components/ui/button-variants';
import { Badge } from '../components/ui/badge';
import { CATEGORY_LABEL } from '../lib/categories';
import { CLASS_CAPTION, ecoRating } from '../lib/eco';
import { cn, formatPrice } from '../lib/utils';
import useCartStore from '../stores/store';

const TABS = [
    { key: 'description', label: 'Description' },
    { key: 'specs', label: 'Specs' },
    { key: 'reviews', label: 'Reviews' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function Product() {
    const { id } = useParams();
    const numericID = Number(id);
    const valid = Number.isFinite(numericID) && numericID > 0;

    const { data: product, error, isLoading } = useQuery({
        queryKey: ['products', numericID],
        queryFn: () => fetchProduct(numericID),
        enabled: valid,
    });
    const { data: allProducts } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

    const { addItem, items } = useCartStore();
    const [activeTab, setActiveTab] = useState<TabKey>('description');
    const [quantity, setQuantity] = useState(1);

    if (!valid || error) return <ProductMissing id={id} />;
    if (isLoading || !product) return <SuspenseFallback />;

    const rating = ecoRating(product);
    const inCart = items.find((item) => item.id === product.id);
    const related = (allProducts ?? [])
        .filter((item) => item.category === product.category && item.id !== product.id)
        .slice(0, 4);

    return (
        <div className="wrap py-10 sm:py-14">
            <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1 font-mono text-xs text-bark-soft">
                    <li>
                        <Link to="/home" className="hover:text-moss">
                            Home
                        </Link>
                    </li>
                    <ChevronRight className="h-3 w-3" aria-hidden />
                    <li>
                        <Link to={`/products?category=${product.category}`} className="hover:text-moss">
                            {CATEGORY_LABEL[product.category] ?? product.category}
                        </Link>
                    </li>
                    <ChevronRight className="h-3 w-3" aria-hidden />
                    <li className="text-bark" aria-current="page">
                        {product.name}
                    </li>
                </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                {/* ------------------------------ Снимок ------------------------------ */}
                <div className="overflow-hidden rounded-card border border-fibre bg-pulp">
                    <img
                        className="aspect-[4/3] w-full object-cover"
                        src={product.image}
                        alt={product.name}
                        decoding="async"
                    />
                </div>

                {/* ---------------------------- Покупка ---------------------------- */}
                <div>
                    <p className="eyebrow text-moss">{product.brand}</p>
                    <h1 className="mt-3 text-4xl font-extrabold text-pine sm:text-5xl">{product.name}</h1>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5 font-mono text-sm text-bark">
                            <Star className="h-4 w-4 fill-moss text-moss" aria-hidden />
                            {product.rating}
                            <span className="sr-only">out of 5,</span>
                            <span className="text-bark-soft">({product.reviews} reviews)</span>
                        </span>
                        {product.inStock ? (
                            <Badge variant="stock">Ships today</Badge>
                        ) : (
                            <Badge variant="preorder">Pre-order · ships in 2 to 3 weeks</Badge>
                        )}
                    </div>

                    <p className="mt-7 font-mono text-4xl font-medium text-pine">
                        {formatPrice(product.price)}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <div className="flex items-center rounded-full border border-fibre bg-pulp">
                            <button
                                type="button"
                                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-pine transition-colors duration-200 hover:text-moss disabled:opacity-40 disabled:hover:text-pine"
                                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                                disabled={quantity <= 1}
                                aria-label="Decrease quantity"
                            >
                                <Minus className="h-4 w-4" aria-hidden />
                            </button>
                            <span
                                className="w-10 text-center font-mono text-lg text-pine"
                                aria-live="polite"
                                aria-label={`Quantity ${quantity}`}
                            >
                                {quantity}
                            </span>
                            <button
                                type="button"
                                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-pine transition-colors duration-200 hover:text-moss"
                                onClick={() => setQuantity((value) => Math.min(99, value + 1))}
                                aria-label="Increase quantity"
                            >
                                <Plus className="h-4 w-4" aria-hidden />
                            </button>
                        </div>

                        <Button
                            variant="moss"
                            size="lg"
                            className="flex-1 min-w-52"
                            onClick={() => addItem(product, quantity)}
                        >
                            <ShoppingBag className="h-5 w-5" aria-hidden />
                            Add to cart · {formatPrice(product.price * quantity)}
                        </Button>
                    </div>

                    {inCart && (
                        <p className="mt-4 flex items-center gap-2 text-sm text-bark">
                            <Check className="h-4 w-4 text-moss" aria-hidden />
                            {inCart.quantity} in your cart{' · '}
                            <Link to="/cart" className="font-medium text-moss underline underline-offset-4">
                                Go to cart
                            </Link>
                        </p>
                    )}

                    {/* --------------------- Индекс: подписной блок --------------------- */}
                    <section className="crop-marks tex-pulp relative mt-9 rounded-card border border-fibre bg-pulp p-6">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <h2 className="eyebrow text-bark">GreenTech Index</h2>
                                <p className="mt-2 max-w-xs text-[0.9375rem] text-pine">
                                    {CLASS_CAPTION[rating.grade]}
                                </p>
                            </div>
                            <EcoStamp rating={rating} className="h-20 w-20 shrink-0" />
                        </div>
                        <EcoScale rating={rating} className="mt-6" />
                        <EcoAxis rating={rating} className="mt-5" />
                        <p className="mt-6 border-t border-fibre pt-4 text-sm text-bark">
                            Buying this refurbished instead of new keeps about{' '}
                            <span className="font-mono text-pine">{rating.co2Saved} kg</span> of CO₂e out of the
                            air
                        </p>
                    </section>
                </div>
            </div>

            {/* ------------------------------ Вкладки ------------------------------ */}
            <div className="mt-16">
                <div className="flex gap-1 border-b border-fibre" role="tablist" aria-label="Product details">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            role="tab"
                            id={`tab-${tab.key}`}
                            aria-selected={activeTab === tab.key}
                            aria-controls={`panel-${tab.key}`}
                            onClick={() => setActiveTab(tab.key)}
                            className={cn(
                                'cursor-pointer border-b-2 px-5 py-4 font-medium transition-colors duration-200',
                                activeTab === tab.key
                                    ? 'border-moss text-pine'
                                    : 'border-transparent text-bark hover:text-pine',
                            )}
                        >
                            {tab.label}
                            {tab.key === 'reviews' && (
                                <span className="ml-2 font-mono text-xs text-bark-soft">{product.reviews}</span>
                            )}
                        </button>
                    ))}
                </div>

                <div
                    role="tabpanel"
                    id={`panel-${activeTab}`}
                    aria-labelledby={`tab-${activeTab}`}
                    // key заставляет панель перемонтироваться при смене вкладки,
                    // иначе анимация проигрывается только один раз.
                    key={activeTab}
                    className="grid animate-fade-in gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
                >
                    {activeTab === 'description' && (
                        <>
                            <div>
                                <p className="text-lg leading-relaxed text-pine">{product.description}</p>
                            </div>
                            <EcoBreakdown rating={rating} className="h-fit" />
                        </>
                    )}

                    {activeTab === 'specs' && (
                        <>
                            <ProductSpecs product={product} />
                            <EcoBreakdown rating={rating} className="h-fit" />
                        </>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="lg:col-span-2">
                            <div className="flex flex-wrap items-center gap-6 rounded-card border border-fibre bg-pulp p-6">
                                <p className="font-display text-5xl font-extrabold text-pine">{product.rating}</p>
                                <div>
                                    <div className="flex gap-0.5" aria-hidden>
                                        {[0, 1, 2, 3, 4].map((index) => (
                                            <Star
                                                key={index}
                                                className={cn(
                                                    'h-4 w-4',
                                                    index < Math.round(product.rating)
                                                        ? 'fill-moss text-moss'
                                                        : 'text-fibre',
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <p className="mt-1 text-sm text-bark">
                                        Average of {product.reviews} verified purchases
                                    </p>
                                </div>
                            </div>
                            <p className="mt-8 max-w-xl text-bark">
                                Individual reviews are not published yet. The rating above is the average score
                                left by people who bought this device from us
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ------------------------------ Похожее ------------------------------ */}
            {related.length > 0 && (
                <section className="mt-8 border-t border-fibre pt-14">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className="text-3xl font-bold text-pine">
                            More {CATEGORY_LABEL[product.category]?.toLowerCase() ?? product.category}
                        </h2>
                        <Link
                            to={`/products?category=${product.category}`}
                            className={buttonVariants({ variant: 'outline', size: 'sm' })}
                        >
                            See all
                        </Link>
                    </div>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {related.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

/**
 * Раньше здесь стоял throw прямо в рендере. Границы ошибок в приложении нет,
 * поэтому опечатка в адресе роняла весь React в белый экран вместо страницы.
 */
function ProductMissing({ id }: { id?: string }) {
    return (
        <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
            <p className="eyebrow text-bark">No such product</p>
            <h1 className="mt-4 max-w-xl text-4xl font-extrabold text-pine sm:text-5xl">
                We could not find that device
            </h1>
            <p className="mt-4 max-w-md text-bark">
                {id ? `Nothing in the catalog has the id ${id}` : 'That link is missing a product id'}. It may
                have sold out and been taken off the shelf
            </p>
            <Link to="/products" className={cn(buttonVariants({ size: 'lg' }), 'mt-8')}>
                Back to the catalog
            </Link>
        </div>
    );
}
