import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { EcoScale } from './EcoLabel';
import { Wordmark } from './HeaderLayout';
import type { EcoRating } from '../lib/eco';

const SAMPLE: EcoRating = {
    grade: 'A',
    score: 84,
    recycled: 82,
    repairability: 8.4,
    draw: 41,
    co2Saved: 262,
};

/**
 * Общая рама для входа и регистрации: слева — то, ради чего заводят аккаунт,
 * справа — форма. Один макет на две страницы, чтобы переход между ними не
 * ощущался как переход на другой сайт.
 */
export default function AuthLayout({
    eyebrow,
    title,
    lede,
    aside,
    children,
    footer,
}: {
    eyebrow: string;
    title: string;
    lede: string;
    aside: string;
    children: ReactNode;
    footer: ReactNode;
}) {
    return (
        <div className="grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-2">
            <aside className="tex-pine hidden flex-col justify-between bg-pine p-12 lg:flex xl:p-16">
                <Link to="/home">
                    <Wordmark />
                </Link>
                <div>
                    <div className="max-w-64">
                        <EcoScale rating={SAMPLE} size="lg" />
                    </div>
                    <p className="mt-10 max-w-sm font-display text-3xl font-bold leading-tight text-paper">
                        {aside}
                    </p>
                </div>
                <p className="eyebrow text-paper/60">Refurbished &amp; low-impact · since 2022</p>
            </aside>

            <div className="flex items-center justify-center px-5 py-16 sm:px-10">
                <div className="w-full max-w-md">
                    <p className="eyebrow text-bark">{eyebrow}</p>
                    <h1 className="mt-3 text-4xl font-extrabold text-pine">{title}</h1>
                    <p className="mt-3 text-bark">{lede}</p>

                    <div className="mt-9">{children}</div>

                    <div className="mt-8 text-sm text-bark">{footer}</div>
                </div>
            </div>
        </div>
    );
}
