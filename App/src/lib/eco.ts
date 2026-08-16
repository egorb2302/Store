import type { Category, Product } from '../types/types';

/**
 * Индекс GreenTech — собственная оценка магазина, а не государственная
 * маркировка. Класс от A до E складывается из трёх измеримых величин:
 * доля переработанных материалов, ремонтопригодность и потребление.
 *
 * ВАЖНО: в базе этих полей пока нет, поэтому значения выводятся здесь —
 * детерминированно из id и категории товара, чтобы этикетка не прыгала между
 * рендерами. Это витринные цифры демо-каталога, ровно как отзывы «John Doe»
 * и картинки с Unsplash. Когда в products появятся настоящие колонки
 * recycled_pct / repairability / power_draw_w — вся эта функция сводится к
 * чтению из товара, а формула класса и компонент этикетки не меняются.
 */

export type EcoClass = 'A' | 'B' | 'C' | 'D' | 'E';

export interface EcoRating {
    /** Класс от A (лучший) до E. */
    grade: EcoClass;
    /** Сводный балл 0–100, из которого получен класс. */
    score: number;
    /** Доля переработанных материалов в корпусе, %. */
    recycled: number;
    /** Ремонтопригодность по десятибалльной шкале. */
    repairability: number;
    /** Типичное потребление под нагрузкой, Вт. */
    draw: number;
    /** Сколько кг CO₂e экономит покупка вместо нового устройства. */
    co2Saved: number;
}

/** Ориентиры по категориям: потребление и заложенный при производстве след. */
const BASELINE: Record<Category, { draw: number; embodied: number; recycled: number; repair: number }> = {
    laptops: { draw: 45, embodied: 320, recycled: 55, repair: 6.5 },
    phones: { draw: 6, embodied: 70, recycled: 48, repair: 5.5 },
    audio: { draw: 2, embodied: 22, recycled: 72, repair: 7.5 },
    accessories: { draw: 2, embodied: 9, recycled: 80, repair: 8.5 },
    monitors: { draw: 32, embodied: 210, recycled: 62, repair: 7 },
    tablets: { draw: 11, embodied: 120, recycled: 44, repair: 4.5 },
    components: { draw: 200, embodied: 260, recycled: 38, repair: 6 },
};

const FALLBACK = { draw: 20, embodied: 100, recycled: 50, repair: 6 };

/** Стабильный псевдослучайный разброс 0–1: один и тот же товар — одно число. */
function spread(id: number, salt: number) {
    const x = Math.sin(id * 127.1 + salt * 311.7) * 43758.5453;
    return x - Math.floor(x);
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

export function ecoRating(product: Pick<Product, 'id' | 'category' | 'rating'>): EcoRating {
    const base = BASELINE[product.category] ?? FALLBACK;
    const id = Number(product.id) || 1;

    const recycled = Math.round(clamp(base.recycled + (spread(id, 1) - 0.4) * 26, 20, 96));
    const repairability = Number(clamp(base.repair + (spread(id, 2) - 0.45) * 2.6, 1, 10).toFixed(1));
    const draw = Math.round(base.draw * (0.85 + spread(id, 3) * 0.32));

    // Потребление нормируем внутри категории: 200 Вт у видеокарты — это норма,
    // а у наушников это была бы катастрофа. Сравнивать их напрямую бессмысленно.
    const drawScore = clamp(100 - ((draw - base.draw) / base.draw) * 120, 0, 100);
    const score = Math.round(recycled * 0.4 + repairability * 10 * 0.35 + drawScore * 0.25);

    const co2Saved = Math.round((base.embodied * recycled) / 100);

    return { grade: gradeFor(score), score, recycled, repairability, draw, co2Saved };
}

function gradeFor(score: number): EcoClass {
    if (score >= 78) return 'A';
    if (score >= 68) return 'B';
    if (score >= 58) return 'C';
    if (score >= 48) return 'D';
    return 'E';
}

export const ECO_CLASSES: EcoClass[] = ['A', 'B', 'C', 'D', 'E'];

/** Заливка ступени. Лист достаётся только классу A — иначе шкала не читается. */
export const CLASS_FILL: Record<EcoClass, string> = {
    A: 'bg-sprout',
    B: 'bg-moss',
    C: 'bg-moss-deep',
    D: 'bg-bark-soft',
    E: 'bg-rust',
};

export const CLASS_TEXT: Record<EcoClass, string> = {
    A: 'text-pine',
    B: 'text-paper',
    C: 'text-paper',
    D: 'text-pine',
    E: 'text-paper',
};

export const CLASS_CAPTION: Record<EcoClass, string> = {
    A: 'Best in its category',
    B: 'Well above average',
    C: 'Around the category average',
    D: 'Below average for its category',
    E: 'High impact, read the breakdown',
};
