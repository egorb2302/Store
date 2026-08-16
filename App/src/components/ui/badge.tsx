import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
    'inline-flex items-center gap-1.5 rounded-full font-mono text-[0.6875rem] font-medium ' +
        'uppercase tracking-[0.12em] px-3 py-1',
    {
        variants: {
            variant: {
                stock: 'bg-pine text-paper',
                preorder: 'bg-pulp text-bark border border-fibre',
                inCart: 'bg-sprout text-pine',
                quiet: 'bg-pulp text-bark',
                onDark: 'bg-paper/12 text-paper',
            },
        },
        defaultVariants: { variant: 'quiet' },
    },
);

export type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
    return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
