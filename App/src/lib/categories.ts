import type { Category } from '../types/types';

export const CATEGORIES: { key: Category; label: string }[] = [
    { key: 'laptops', label: 'Laptops' },
    { key: 'phones', label: 'Phones' },
    { key: 'audio', label: 'Audio' },
    { key: 'monitors', label: 'Monitors' },
    { key: 'tablets', label: 'Tablets' },
    { key: 'components', label: 'Components' },
    { key: 'accessories', label: 'Accessories' },
];

export const CATEGORY_LABEL = Object.fromEntries(
    CATEGORIES.map(({ key, label }) => [key, label]),
) as Record<Category, string>;

const KNOWN = new Set<string>(CATEGORIES.map(({ key }) => key));

/**
 * Приводит категорию из базы к каноничной.
 *
 * Часть записей всё ещё лежит со старой опечаткой «accesories». Нормализация
 * на входе означает, что дальше по коду про два написания знать не нужно.
 */
export function normalizeCategory(value: string): Category {
    const cleaned = value?.trim().toLowerCase() ?? '';
    if (cleaned === 'accesories') return 'accessories';
    return (KNOWN.has(cleaned) ? cleaned : 'accessories') as Category;
}
