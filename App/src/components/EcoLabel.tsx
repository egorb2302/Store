import { Recycle, Wrench, Zap } from 'lucide-react';
import {
    CLASS_CAPTION,
    CLASS_FILL,
    CLASS_TEXT,
    ECO_CLASSES,
    type EcoClass,
    type EcoRating,
} from '../lib/eco';
import { cn } from '../lib/utils';

/**
 * Подписной элемент магазина: ступенчатая шкала классов A–E.
 *
 * Форма взята не с потолка — так выглядит энергетическая этикетка на любом
 * приборе в магазине бытовой техники. Это единственный артефакт, который в
 * этой предметной области все узнают без объяснений, поэтому он и стал
 * опознавательным знаком: одна и та же шкала работает в трёх размерах —
 * полоска в карточке каталога, разворот на странице товара, герой на главной.
 */

const ROW_WIDTH: Record<string, string> = {
    A: '46%',
    B: '58%',
    C: '70%',
    D: '84%',
    E: '97%',
};

const CHEVRON = 'polygon(0 0, calc(100% - 0.6rem) 0, 100% 50%, calc(100% - 0.6rem) 100%, 0 100%)';

export function EcoScale({
    rating,
    size = 'md',
    className,
}: {
    rating: EcoRating;
    size?: 'md' | 'lg';
    className?: string;
}) {
    const large = size === 'lg';

    return (
        <div
            className={cn('flex flex-col', large ? 'gap-2' : 'gap-1.5', className)}
            role="img"
            aria-label={`GreenTech Index, class ${rating.grade} of A to E, ${CLASS_CAPTION[rating.grade]}`}
        >
            {ECO_CLASSES.map((grade, index) => {
                const active = grade === rating.grade;
                return (
                    <div
                        key={grade}
                        className={cn(
                            'flex items-center animate-draw-bar origin-left',
                            large ? 'h-8' : 'h-5',
                            active ? CLASS_FILL[grade] : 'bg-fibre',
                        )}
                        style={{
                            width: ROW_WIDTH[grade],
                            clipPath: CHEVRON,
                            animationDelay: `${index * 70}ms`,
                        }}
                    >
                        <span
                            className={cn(
                                'font-display font-extrabold',
                                large ? 'pl-4 text-xl' : 'pl-2.5 text-xs',
                                // На серой ступени bark-soft давал 4:1 — для
                                // буквы в 12 px этого мало.
                                active ? CLASS_TEXT[grade] : 'text-bark',
                            )}
                        >
                            {grade}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

/** Крупный знак достигнутого класса — то, что видно с другого конца страницы. */
export function EcoStamp({ rating, className }: { rating: EcoRating; className?: string }) {
    return (
        <div
            className={cn(
                'flex items-center justify-center rounded-inset animate-snap',
                CLASS_FILL[rating.grade],
                CLASS_TEXT[rating.grade],
                className,
            )}
            style={{ animationDelay: '380ms' }}
        >
            <span className="font-display text-6xl font-extrabold leading-none">{rating.grade}</span>
        </div>
    );
}

/** Границы классов на стобалльной шкале, снизу вверх. */
const BANDS: { grade: EcoClass; from: number }[] = [
    { grade: 'E', from: 0 },
    { grade: 'D', from: 48 },
    { grade: 'C', from: 58 },
    { grade: 'B', from: 68 },
    { grade: 'A', from: 78 },
];

/**
 * Числовая шкала под ступенями.
 *
 * Буква сама по себе не говорит, насколько близко устройство к соседнему
 * классу: 68 и 77 — оба B, но это очень разные покупки. Линейка с границами
 * классов показывает именно это. Стрелка выезжает от нуля к своему делению —
 * этикетка ведёт себя как прибор, снимающий замер, а не как картинка.
 */
export function EcoAxis({ rating, className }: { rating: EcoRating; className?: string }) {
    return (
        <div className={cn('select-none', className)}>
            <div className="relative h-9">
                <div className="absolute inset-x-0 top-5 h-px bg-fibre" />

                {BANDS.map(({ grade, from }, index) => {
                    const to = BANDS[index + 1]?.from ?? 100;
                    return (
                        <div key={grade}>
                            {from > 0 && (
                                <span
                                    className="absolute top-3 h-3 w-px bg-fibre"
                                    style={{ left: `${from}%` }}
                                    aria-hidden
                                />
                            )}
                            <span
                                className={cn(
                                    'absolute top-6 -translate-x-1/2 font-mono text-[0.625rem] tracking-[0.1em]',
                                    grade === rating.grade ? 'text-pine' : 'text-bark-soft',
                                )}
                                style={{ left: `${(from + to) / 2}%` }}
                                aria-hidden
                            >
                                {grade}
                            </span>
                        </div>
                    );
                })}

                <div
                    className="absolute top-0 animate-sweep"
                    style={{ left: `${rating.score}%`, animationDelay: '520ms' }}
                >
                    <span className="flex -translate-x-1/2 flex-col items-center">
                        <span className="font-mono text-xs font-medium text-pine">{rating.score}</span>
                        <span
                            className={cn('mt-0.5 h-2 w-2 rotate-45', CLASS_FILL[rating.grade])}
                            aria-hidden
                        />
                    </span>
                </div>
            </div>
            <p className="sr-only">
                Scores {rating.score} out of 100. Class {rating.grade} starts at{' '}
                {BANDS.find((band) => band.grade === rating.grade)?.from}.
            </p>
        </div>
    );
}

/** Компактный вариант для карточки каталога. */
export function EcoStrip({ rating, className }: { rating: EcoRating; className?: string }) {
    return (
        <div
            className={cn('flex items-center gap-2', className)}
            title={`GreenTech Index ${rating.grade}, ${CLASS_CAPTION[rating.grade]}`}
        >
            <span className="eyebrow text-bark-soft">Index</span>
            {/* Активный сегмент немного расходится при наведении на карточку —
                глаз цепляется за то, чем товар отличается от соседних. */}
            <div className="flex flex-1 items-center gap-0.5" aria-hidden>
                {ECO_CLASSES.map((grade) => (
                    <span
                        key={grade}
                        className={cn(
                            'h-1.5 flex-1 rounded-full transition-[flex-grow] duration-300',
                            grade === rating.grade
                                ? `${CLASS_FILL[grade]} group-hover:grow-[2.2]`
                                : 'bg-fibre',
                        )}
                    />
                ))}
            </div>
            <span
                className={cn(
                    'flex h-6 w-6 items-center justify-center rounded font-display text-sm font-extrabold',
                    CLASS_FILL[rating.grade],
                    CLASS_TEXT[rating.grade],
                )}
            >
                {rating.grade}
            </span>
            <span className="sr-only">GreenTech Index class {rating.grade} of A to E</span>
        </div>
    );
}

const CRITERIA = [
    {
        code: 'Recycled',
        icon: Recycle,
        value: (r: EcoRating) => `${r.recycled}%`,
        note: 'of the housing by weight',
    },
    {
        code: 'Repair',
        icon: Wrench,
        value: (r: EcoRating) => `${r.repairability}/10`,
        note: 'parts and manuals available',
    },
    {
        code: 'Draw',
        icon: Zap,
        value: (r: EcoRating) => `${r.draw} W`,
        note: 'typical, under load',
    },
] as const;

/** Разбор класса по составляющим — иначе буква остаётся ничем не подкреплённой. */
export function EcoBreakdown({ rating, className }: { rating: EcoRating; className?: string }) {
    return (
        <dl className={cn('grid gap-px overflow-hidden rounded-inset bg-fibre sm:grid-cols-3', className)}>
            {CRITERIA.map(({ code, icon: Icon, value, note }) => (
                <div key={code} className="bg-paper p-4">
                    <dt className="eyebrow flex items-center gap-1.5 text-bark">
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                        {code}
                    </dt>
                    <dd className="mt-2 font-mono text-2xl font-medium text-pine">{value(rating)}</dd>
                    <p className="mt-1 text-sm text-bark-soft">{note}</p>
                </div>
            ))}
        </dl>
    );
}
