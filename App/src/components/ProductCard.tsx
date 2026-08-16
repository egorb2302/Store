import { Check, Plus, Star } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { ecoRating } from '../lib/eco';
import { cn, formatPrice } from '../lib/utils';
import type { Product } from '../types/types';
import useCartStore from '../stores/store';
import { EcoStrip } from './EcoLabel';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function ProductCard({
    product,
    className,
    style,
}: {
    product: Product;
    className?: string;
    style?: CSSProperties;
}) {
    const { addItem, items } = useCartStore();
    const rating = ecoRating(product);

    // Состояние «в корзине» читается из самой корзины. Раньше карточка держала
    // отдельный список нажатых кнопок, и он расходился с корзиной, как только
    // товар удаляли: кнопка «Add» не возвращалась.
    const inCart = items.some((item) => item.id === product.id);

    return (
        <article
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-card border border-fibre bg-paper',
                'transition-[border-color,box-shadow,transform] duration-300',
                'hover:-translate-y-1 hover:border-bark-soft hover:shadow-lift',
                'focus-within:border-bark-soft',
                className,
            )}
            style={style}
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-pulp">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute left-3 top-3">
                    {product.inStock ? (
                        <Badge variant="stock">In stock</Badge>
                    ) : (
                        <Badge variant="preorder">Pre-order</Badge>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <p className="eyebrow text-bark-soft">
                    {product.brand} · {product.category}
                </p>

                {/* Ссылка растянута на всю карточку: кликается карточка целиком,
                    но в поток табуляции попадает ровно один элемент, а не три. */}
                <h3 className="mt-2 text-xl font-bold leading-tight text-pine">
                    <Link
                        to={`/products/${product.id}`}
                        className="rounded transition-colors duration-200 group-hover:text-moss after:absolute after:inset-0 after:content-['']"
                    >
                        {product.name}
                    </Link>
                </h3>

                <EcoStrip rating={rating} className="mt-4" />

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-fibre pt-4">
                    <div>
                        <span className="flex items-center gap-1 font-mono text-xs text-bark-soft">
                            <Star className="h-3 w-3 fill-moss text-moss" aria-hidden />
                            {product.rating}
                            <span className="sr-only">out of 5,</span>
                            <span aria-hidden>·</span>
                            {product.reviews} reviews
                        </span>
                        <p className="mt-1 font-mono text-2xl font-medium text-pine">
                            {formatPrice(product.price)}
                        </p>
                    </div>

                    {inCart ? (
                        <span className="relative z-10 inline-flex h-11 items-center gap-1.5 rounded-full bg-sprout px-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-pine">
                            <Check className="h-3.5 w-3.5" aria-hidden />
                            In cart
                        </span>
                    ) : (
                        <Button
                            variant="moss"
                            size="sm"
                            // Палец — не курсор: на телефоне кнопка обязана быть
                            // не ниже 44 px, иначе в неё просто не попасть.
                            className="relative z-10 h-11 px-5"
                            onClick={() => addItem(product)}
                        >
                            <Plus className="h-4 w-4" aria-hidden />
                            Add
                            <span className="sr-only"> {product.name} to cart</span>
                        </Button>
                    )}
                </div>
            </div>
        </article>
    );
}
