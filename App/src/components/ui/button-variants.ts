import { cva } from 'class-variance-authority';

/**
 * Иерархия здесь держится на цвете, а не на размере: хвойный — то, что двигает
 * покупку вперёд, мох — второй по важности шаг, контур — всё остальное.
 * Раньше градиент emerald→green стоял на каждой кнопке подряд, и «Купить»
 * ничем не отличалось от «Показать все».
 *
 * Лежит отдельно от button.tsx: Fast Refresh требует, чтобы файл компонента
 * экспортировал только компоненты.
 */
export const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap ' +
        'rounded-full transition-[background-color,color,border-color,transform] duration-200 ' +
        'cursor-pointer select-none active:scale-[0.98] ' +
        'disabled:pointer-events-none disabled:opacity-55',
    {
        variants: {
            variant: {
                primary: 'bg-pine text-paper hover:bg-pine-soft',
                moss: 'bg-moss text-paper hover:bg-moss-deep',
                outline: 'border border-pine/25 text-pine hover:border-pine hover:bg-pine/5',
                ghost: 'text-pine hover:bg-pine/8',
                onDark: 'bg-paper text-pine hover:bg-sprout',
                onDarkOutline: 'border border-paper/30 text-paper hover:border-sprout hover:text-sprout',
                danger: 'border border-rust/40 text-rust hover:bg-rust/10 hover:border-rust',
            },
            size: {
                sm: 'h-9 px-4 text-sm',
                md: 'h-11 px-6 text-[0.9375rem]',
                lg: 'h-14 px-8 text-base',
                icon: 'h-11 w-11',
            },
        },
        defaultVariants: { variant: 'primary', size: 'md' },
    },
);
