import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Склеивает классы и разруливает конфликты Tailwind: последний побеждает. */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

const priceFormatCents = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

/** Цены в каталоге целые — копейки показываем только там, где есть дробь. */
export function formatPrice(value: number) {
    return Number.isInteger(value) ? priceFormat.format(value) : priceFormatCents.format(value);
}
