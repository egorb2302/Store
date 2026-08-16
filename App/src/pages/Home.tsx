import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Recycle, Wrench, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { fetchProducts } from '../api/api';
import { EcoAxis, EcoScale, EcoStamp } from '../components/EcoLabel';
import ProductCard from '../components/ProductCard';
import { SectionHead } from '../components/ui/card';
import { buttonVariants } from '../components/ui/button-variants';
import { Skeleton } from '../components/ui/skeleton';
import { useReveal } from '../lib/use-reveal';
import { CATEGORIES } from '../lib/categories';
import type { EcoRating } from '../lib/eco';

/** Образец для героя: он должен стоять на месте с первого кадра, без ожидания сети. */
const SAMPLE: EcoRating = {
    grade: 'A',
    score: 84,
    recycled: 82,
    repairability: 8.4,
    draw: 41,
    co2Saved: 262,
};

const CRITERIA = [
    {
        code: 'Recycled',
        icon: Recycle,
        range: '20 to 96%',
        title: 'What it is made of',
        body: 'Share of the housing and chassis, by weight, that came from recovered material rather than virgin stock',
    },
    {
        code: 'Repair',
        icon: Wrench,
        range: '1 to 10',
        title: 'Whether you can fix it',
        body: 'Screws over glue, a battery you can reach, spare parts and a service manual that still exist five years from now',
    },
    {
        code: 'Draw',
        icon: Zap,
        range: 'watts',
        title: 'What it costs to run',
        body: 'Typical draw under load, scored against its own category, because a graphics card is never going to sip like a pair of earbuds',
    },
];

export default function Home() {
    const root = useReveal<HTMLDivElement>();
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    const featured = [...(products ?? [])]
        .filter((product) => product.inStock)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    return (
        <div ref={root}>
            {/* ---------------- Герой: этикетка и есть главная картинка ---------------- */}
            <section className="wrap grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
                <div>
                    <p className="eyebrow animate-rise text-bark">Refurbished &amp; low-impact · since 2022</p>
                    <h1
                        className="mt-5 animate-rise text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold text-pine"
                        style={{ animationDelay: '80ms' }}
                    >
                        Tech that earns
                        <br />
                        its label
                    </h1>
                    <p
                        className="mt-6 max-w-lg animate-rise text-lg leading-relaxed text-bark"
                        style={{ animationDelay: '160ms' }}
                    >
                        Every device we sell carries a GreenTech Index: recycled content, repairability and power
                        draw, scored on one scale. Compare on something other than price
                    </p>
                    <div
                        className="mt-9 flex animate-rise flex-col gap-3 sm:flex-row"
                        style={{ animationDelay: '240ms' }}
                    >
                        <Link to="/products" className={buttonVariants({ size: 'lg' })}>
                            Browse the catalog
                            <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <a href="#index" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                            How the index works
                        </a>
                    </div>
                </div>

                <figure
                    className="crop-marks tex-pulp relative animate-rise rounded-card border border-fibre bg-pulp p-6 sm:p-8"
                    style={{ animationDelay: '120ms' }}
                >
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <p className="eyebrow text-bark">GreenTech Index</p>
                            <p className="mt-1 font-display text-xl font-bold text-pine">Example label</p>
                        </div>
                        <EcoStamp rating={SAMPLE} className="h-24 w-24 shrink-0" />
                    </div>

                    <EcoScale rating={SAMPLE} size="lg" className="mt-7" />
                    <EcoAxis rating={SAMPLE} className="mt-6" />

                    <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-fibre pt-5">
                        <div>
                            <dt className="eyebrow text-bark">Recycled</dt>
                            <dd className="mt-1 font-mono text-lg text-pine">{SAMPLE.recycled}%</dd>
                        </div>
                        <div>
                            <dt className="eyebrow text-bark">Repair</dt>
                            <dd className="mt-1 font-mono text-lg text-pine">{SAMPLE.repairability}/10</dd>
                        </div>
                        <div>
                            <dt className="eyebrow text-bark">Draw</dt>
                            <dd className="mt-1 font-mono text-lg text-pine">{SAMPLE.draw} W</dd>
                        </div>
                    </dl>
                    <figcaption className="mt-5 text-sm text-bark-soft">
                        Buying this one refurbished instead of new keeps about {SAMPLE.co2Saved} kg of CO₂e out of
                        the air
                    </figcaption>
                </figure>
            </section>

            {/* ---------------- Что измеряет индекс ---------------- */}
            <section id="index" className="tex-pulp border-y border-fibre bg-pulp py-20 sm:py-24">
                <div className="wrap">
                    <SectionHead
                        className="reveal"
                        eyebrow="Three criteria"
                        title="What the index measures"
                        lede="No badge, no leaf, no vague promise. Three numbers you can check against the spec sheet"
                    />
                    <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-fibre sm:grid-cols-2 lg:grid-cols-3">
                        {CRITERIA.map(({ code, icon: Icon, range, title, body }, index) => (
                            <div
                                key={code}
                                className="reveal bg-paper p-7"
                                style={{ transitionDelay: `${index * 90}ms` }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="eyebrow flex items-center gap-2 text-moss">
                                        <Icon className="h-4 w-4" aria-hidden />
                                        {code}
                                    </span>
                                    <span className="eyebrow text-bark-soft">{range}</span>
                                </div>
                                <h3 className="mt-5 text-2xl font-bold text-pine">{title}</h3>
                                <p className="mt-3 text-[0.9375rem] leading-relaxed text-bark">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Категории ---------------- */}
            <section className="wrap py-20 sm:py-24">
                <div className="reveal flex flex-wrap items-end justify-between gap-6">
                    <SectionHead eyebrow="Browse" title="Start with a shelf" />
                    <Link to="/products" className={buttonVariants({ variant: 'outline' })}>
                        See everything
                        <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
                <ul className="reveal mt-10 flex flex-wrap gap-3">
                    {CATEGORIES.map((category) => (
                        <li key={category.key}>
                            <Link
                                to={`/products?category=${category.key}`}
                                className="inline-flex items-center gap-2 rounded-full border border-fibre bg-paper px-5 py-3 font-medium text-pine transition-colors duration-200 hover:border-pine hover:bg-pine hover:text-paper"
                            >
                                {category.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ---------------- Избранное ---------------- */}
            <section className="wrap pb-24 sm:pb-28">
                <SectionHead
                    className="reveal"
                    eyebrow="In stock now"
                    title="Rated best by our customers"
                    lede="Top-rated devices we can ship today"
                />
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {isLoading
                        ? [0, 1, 2].map((key) => <Skeleton key={key} className="h-[26rem] rounded-card" />)
                        : featured.map((product, index) => (
                              <ProductCard
                                  key={product.id}
                                  product={product}
                                  className="reveal"
                                  style={{ transitionDelay: `${index * 90}ms` }}
                              />
                          ))}
                </div>
                {!isLoading && featured.length === 0 && (
                    <p className="mt-10 text-bark">
                        Nothing is in stock right now.{' '}
                        <Link to="/products" className="font-medium text-moss underline underline-offset-4">
                            Browse pre-orders
                        </Link>
                    </p>
                )}
            </section>
        </div>
    );
}
