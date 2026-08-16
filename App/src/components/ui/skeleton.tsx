import type { ComponentProps } from 'react';
import { cn } from '../../lib/utils';

/** Держит место под контент, чтобы страница не прыгала после загрузки. */
export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('animate-pulse rounded-inset bg-pulp', className)} {...props} />;
}
