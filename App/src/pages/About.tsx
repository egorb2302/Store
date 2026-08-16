import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { SectionHead } from '../components/ui/card';
import { buttonVariants } from '../components/ui/button-variants';
import { useReveal } from '../lib/use-reveal';

/** Три принципа — не абстракции, а те самые три числа на этикетке. */
const PRINCIPLES = [
    {
        criterion: 'Recycled',
        title: 'Sustainability',
        body: 'Recycled, biodegradable or responsibly sourced materials. The share shows up on every label, by weight',
    },
    {
        criterion: 'Draw',
        title: 'Energy efficiency',
        body: 'Devices that keep power consumption down without giving up the performance you bought them for',
    },
    {
        criterion: 'Repair',
        title: 'Longevity',
        body: 'Repairable, upgradeable, built to last. A device that survives five years is worth more than any offset',
    },
];

const SHELVES = [
    {
        title: 'Solar-powered devices',
        body: 'Portable chargers, solar speakers, backpacks with built-in charging and outdoor lighting that runs on daylight',
    },
    {
        title: 'Energy-efficient home tech',
        body: 'Smart thermostats, LED bulbs, energy-monitoring plugs and low-power home assistants',
    },
    {
        title: 'Eco-friendly accessories',
        body: 'Biodegradable cases, recycled-plastic sleeves, bamboo keyboards, cork mouse pads and cables made from reclaimed ocean plastic',
    },
    {
        title: 'Refurbished & pre-loved',
        body: 'Inspected phones, laptops and tablets that perform like new, cost less and stay out of landfill',
    },
    {
        title: 'Green audio',
        body: 'Headphones and earbuds built from sustainable wood, recycled aluminium and plant-based leather',
    },
];

export default function About() {
    const root = useReveal<HTMLDivElement>();

    return (
        <div ref={root}>
            <section className="wrap py-16 sm:py-24">
                <p className="eyebrow text-bark">About GreenTech</p>
                <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-extrabold text-pine">
                    We sell electronics we can defend
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bark sm:text-xl">
                    GreenTech has been curating eco-friendly electronics, energy-efficient gadgets and
                    sustainable accessories since 2022. The goal is not to make you feel guilty about buying a
                    laptop. It is to make the greener one the easy choice: affordable, available and openly
                    scored
                </p>
            </section>

            <section className="tex-pulp border-y border-fibre bg-pulp py-20 sm:py-24">
                <div className="wrap">
                    <SectionHead
                        className="reveal"
                        eyebrow="What we vet for"
                        title="Three principles, three numbers"
                        lede="Each principle maps to one figure on the GreenTech Index, so a claim on this page can always be checked on a product page"
                    />
                    <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-fibre lg:grid-cols-3">
                        {PRINCIPLES.map(({ criterion, title, body }, index) => (
                            <div
                                key={title}
                                className="reveal bg-paper p-8"
                                style={{ transitionDelay: `${index * 90}ms` }}
                            >
                                <p className="eyebrow text-moss">{criterion}</p>
                                <h3 className="mt-5 text-2xl font-bold text-pine">{title}</h3>
                                <p className="mt-3 leading-relaxed text-bark">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="wrap py-20 sm:py-24">
                <SectionHead className="reveal" eyebrow="What we stock" title="Five shelves" />
                <div className="reveal mt-12 divide-y divide-fibre border-y border-fibre">
                    {SHELVES.map(({ title, body }) => (
                        <div key={title} className="grid gap-3 py-8 md:grid-cols-[18rem_1fr] md:gap-10">
                            <h3 className="text-2xl font-bold text-pine">{title}</h3>
                            <p className="max-w-2xl leading-relaxed text-bark">{body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="wrap pb-24">
                <div className="tex-pine reveal flex flex-col items-start gap-6 rounded-card bg-pine p-9 sm:flex-row sm:items-center sm:justify-between sm:p-12">
                    <h2 className="max-w-lg text-3xl font-bold text-paper sm:text-4xl">
                        Ready to see what that looks like on a price tag?
                    </h2>
                    <Link
                        to="/products"
                        className={buttonVariants({ variant: 'onDark', size: 'lg' })}
                    >
                        Browse the catalog
                        <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            </section>
        </div>
    );
}
