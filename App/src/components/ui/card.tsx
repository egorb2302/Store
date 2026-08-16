import type { ComponentProps } from 'react';
import { cn } from '../../lib/utils';

/** Лист бумаги на листе бумаги: границу держит волокно, а не тень. */
export function Card({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            className={cn('rounded-card border border-fibre bg-paper', className)}
            {...props}
        />
    );
}

export function CardInset({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('rounded-inset border border-fibre bg-pulp p-4', className)} {...props} />;
}

export function SectionHead({
    eyebrow,
    title,
    lede,
    className,
}: {
    eyebrow: string;
    title: string;
    lede?: string;
    className?: string;
}) {
    return (
        <div className={cn('max-w-2xl', className)}>
            <p className="eyebrow text-bark">{eyebrow}</p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-pine">{title}</h2>
            {lede && <p className="mt-4 text-base sm:text-lg text-bark leading-relaxed">{lede}</p>}
        </div>
    );
}
