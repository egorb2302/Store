import { useQuery } from '@tanstack/react-query';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { fetchProducts } from '../api/api';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { CATEGORIES, CATEGORY_LABEL } from '../lib/categories';
import { ecoRating } from '../lib/eco';
import { cn } from '../lib/utils';
import type { Category, Product } from '../types/types';

/**
 * Фильтры живут в адресной строке, а не в useState.
 *
 * Так подборка становится ссылкой: её можно отправить, положить в закладки и
 * вернуться к ней кнопкой «назад». Раньше категории и наличие лежали в
 * состоянии компонента, «назад» уносило со страницы целиком, а с главной
 * нельзя было привести человека сразу в нужный раздел.
 */

const SORTS = [
    { key: 'featured', label: 'Featured' },
    { key: 'index', label: 'Best index' },
    { key: 'price-asc', label: 'Price, low first' },
    { key: 'price-desc', label: 'Price, high first' },
    { key: 'rating', label: 'Top rated' },
] as const;

type SortKey = (typeof SORTS)[number]['key'];

function sortProducts(products: Product[], sort: SortKey) {
    const copy = [...products];
    switch (sort) {
        case 'index':
            return copy.sort((a, b) => ecoRating(b).score - ecoRating(a).score);
        case 'price-asc':
            return copy.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return copy.sort((a, b) => b.price - a.price);
        case 'rating':
            return copy.sort((a, b) => b.rating - a.rating);
        default:
            return copy;
    }
}

export default function Catalog() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtersOpen, setFiltersOpen] = useState(false);

    const {
        data: products,
        error,
        isLoading,
    } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

    const query = searchParams.get('q') ?? '';
    const selected = (searchParams.get('category')?.split(',').filter(Boolean) ?? []) as Category[];
    const inStockOnly = searchParams.get('stock') === '1';
    const sort = (SORTS.find((item) => item.key === searchParams.get('sort'))?.key ?? 'featured') as SortKey;
    const hasFilters = query !== '' || selected.length > 0 || inStockOnly;

    const patchParams = (patch: Record<string, string | null>) => {
        const next = new URLSearchParams(searchParams);
        Object.entries(patch).forEach(([key, value]) => {
            if (value === null || value === '') next.delete(key);
            else next.set(key, value);
        });
        setSearchParams(next, { replace: true });
    };

    const toggleCategory = (category: Category) => {
        const next = selected.includes(category)
            ? selected.filter((item) => item !== category)
            : [...selected, category];
        patchParams({ category: next.join(',') });
    };

    const matchesQuery = (product: Product) =>
        query === '' || `${product.name} ${product.brand}`.toLowerCase().includes(query.toLowerCase());
    const matchesStock = (product: Product) => !inStockOnly || product.inStock;

    const visible = sortProducts(
        (products ?? []).filter(
            (product) =>
                matchesQuery(product) &&
                matchesStock(product) &&
                (selected.length === 0 || selected.includes(product.category)),
        ),
        sort,
    );

    // Счётчик у категории показывает, сколько найдётся при её включении, то есть
    // считается по остальным фильтрам, но без учёта самих категорий. Иначе после
    // первого же выбора у всех соседей встали бы нули.
    const countFor = (category: Category) =>
        (products ?? []).filter(
            (product) => product.category === category && matchesQuery(product) && matchesStock(product),
        ).length;

    const filterPanel = (
        <div className="space-y-7">
            <fieldset>
                <legend className="eyebrow text-bark">Category</legend>
                <div className="mt-4 space-y-1">
                    {CATEGORIES.map((category) => {
                        const count = countFor(category.key);
                        return (
                            <label
                                key={category.key}
                                className={cn(
                                    'flex cursor-pointer items-center gap-3 rounded py-1.5 text-[0.9375rem] transition-colors duration-200',
                                    count === 0 ? 'text-bark-soft' : 'text-pine hover:text-moss',
                                )}
                            >
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-moss"
                                    checked={selected.includes(category.key)}
                                    onChange={() => toggleCategory(category.key)}
                                />
                                <span className="flex-1">{category.label}</span>
                                <span className="font-mono text-xs text-bark-soft">{count}</span>
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            <fieldset className="border-t border-fibre pt-6">
                <legend className="eyebrow text-bark">Availability</legend>
                <label className="mt-4 flex cursor-pointer items-center gap-3 py-1.5 text-[0.9375rem] text-pine transition-colors duration-200 hover:text-moss">
                    <input
                        type="checkbox"
                        className="h-4 w-4 accent-moss"
                        checked={inStockOnly}
                        onChange={(event) => patchParams({ stock: event.target.checked ? '1' : null })}
                    />
                    Ships today
                </label>
            </fieldset>
        </div>
    );

    return (
        <div className="wrap py-12 sm:py-16">
            <header className="flex flex-wrap items-end justify-between gap-6">
                <div>
                    <p className="eyebrow text-bark">Catalog</p>
                    <h1 className="mt-3 text-4xl font-extrabold text-pine sm:text-5xl">
                        Everything on the shelf
                    </h1>
                </div>

                <form
                    className="flex w-full max-w-md gap-2"
                    onSubmit={(event) => {
                        event.preventDefault();
                        const value = new FormData(event.currentTarget).get('q');
                        patchParams({ q: typeof value === 'string' ? value.trim() : null });
                    }}
                    role="search"
                >
                    <label htmlFor="catalog-search" className="sr-only">
                        Search products
                    </label>
                    <div className="relative flex-1">
                        <Search
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bark-soft"
                            aria-hidden
                        />
                        <input
                            id="catalog-search"
                            name="q"
                            type="search"
                            defaultValue={query}
                            key={query}
                            placeholder="Search by name or brand"
                            className="w-full rounded-full border border-fibre bg-pulp py-3 pl-11 pr-4 text-pine placeholder:text-bark-soft transition-colors duration-200 hover:border-bark-soft focus:border-moss focus:bg-paper"
                        />
                    </div>
                    <Button type="submit">Search</Button>
                </form>
            </header>

            <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:gap-14">
                <aside className="lg:w-56 lg:shrink-0">
                    <Button
                        variant="outline"
                        className="w-full lg:hidden"
                        onClick={() => setFiltersOpen((open) => !open)}
                        aria-expanded={filtersOpen}
                        aria-controls="catalog-filters"
                    >
                        <SlidersHorizontal className="h-4 w-4" aria-hidden />
                        Filters
                        {hasFilters && (
                            <span className="ml-1 rounded-full bg-sprout px-2 font-mono text-[0.625rem] text-pine">
                                on
                            </span>
                        )}
                    </Button>

                    <div
                        id="catalog-filters"
                        className={cn(
                            'mt-5 lg:sticky lg:top-24 lg:mt-0 lg:block',
                            filtersOpen ? 'block' : 'hidden',
                        )}
                    >
                        {filterPanel}
                    </div>
                </aside>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-fibre pb-4">
                        <p className="eyebrow text-bark">
                            {isLoading
                                ? 'Loading products'
                                : `${visible.length} ${visible.length === 1 ? 'product' : 'products'}`}
                        </p>

                        <div className="flex items-center gap-2">
                            <label htmlFor="catalog-sort" className="eyebrow text-bark-soft">
                                Sort
                            </label>
                            <select
                                id="catalog-sort"
                                value={sort}
                                onChange={(event) =>
                                    patchParams({
                                        sort: event.target.value === 'featured' ? null : event.target.value,
                                    })
                                }
                                className="cursor-pointer rounded-full border border-fibre bg-pulp px-4 py-2 text-sm text-pine transition-colors duration-200 hover:border-bark-soft focus:border-moss"
                            >
                                {SORTS.map((option) => (
                                    <option key={option.key} value={option.key}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Что именно сейчас включено, видно прямо над сеткой, и снимается
                        оттуда же. Иначе на телефоне фильтры прячутся за кнопкой, и
                        человек не понимает, почему товаров вдруг стало три. */}
                    {hasFilters && (
                        <ul className="mt-4 flex flex-wrap items-center gap-2">
                            {query && (
                                <FilterChip label={`“${query}”`} onRemove={() => patchParams({ q: null })} />
                            )}
                            {selected.map((category) => (
                                <FilterChip
                                    key={category}
                                    label={CATEGORY_LABEL[category] ?? category}
                                    onRemove={() => toggleCategory(category)}
                                />
                            ))}
                            {inStockOnly && (
                                <FilterChip label="Ships today" onRemove={() => patchParams({ stock: null })} />
                            )}
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setSearchParams({}, { replace: true })}
                                    className="cursor-pointer px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-bark underline underline-offset-4 transition-colors duration-200 hover:text-moss"
                                >
                                    Clear all
                                </button>
                            </li>
                        </ul>
                    )}

                    {error && (
                        <div className="mt-10 rounded-card border border-rust/30 bg-rust/5 p-8">
                            <h2 className="text-2xl font-bold text-pine">The catalog did not load</h2>
                            <p className="mt-2 text-bark">
                                The product service did not answer. Nothing is wrong with your filters
                            </p>
                            <Button className="mt-6" onClick={() => window.location.reload()}>
                                Try again
                            </Button>
                        </div>
                    )}

                    {isLoading && (
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {[0, 1, 2, 3, 4, 5].map((key) => (
                                <Skeleton key={key} className="h-[26rem] rounded-card" />
                            ))}
                        </div>
                    )}

                    {!isLoading && !error && visible.length > 0 && (
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {visible.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    className="animate-rise"
                                    style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
                                />
                            ))}
                        </div>
                    )}

                    {!isLoading && !error && visible.length === 0 && (
                        <div className="tex-pulp mt-8 rounded-card border border-fibre bg-pulp px-8 py-16 text-center">
                            <h2 className="text-2xl font-bold text-pine">Nothing matches that</h2>
                            <p className="mx-auto mt-3 max-w-sm text-bark">
                                Try a shorter search, or drop a filter. There are {products?.length ?? 0}{' '}
                                products in the catalog
                            </p>
                            <Button className="mt-7" onClick={() => setSearchParams({}, { replace: true })}>
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <li>
            <button
                type="button"
                onClick={onRemove}
                className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-fibre bg-pulp py-1.5 pl-3.5 pr-2.5 text-sm text-pine transition-colors duration-200 hover:border-rust/40 hover:text-rust"
            >
                {label}
                <X className="h-3.5 w-3.5 text-bark-soft transition-colors duration-200 group-hover:text-rust" aria-hidden />
                <span className="sr-only">Remove this filter</span>
            </button>
        </li>
    );
}
