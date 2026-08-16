import { AlertCircle } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../lib/utils';

export function Input({ className, ...props }: ComponentProps<'input'>) {
    return (
        <input
            className={cn(
                'w-full rounded-inset border border-fibre bg-pulp px-4 py-3',
                'text-pine placeholder:text-bark-soft',
                'transition-colors duration-200',
                'hover:border-bark-soft focus:border-moss focus:bg-paper',
                'aria-[invalid=true]:border-rust',
                className,
            )}
            {...props}
        />
    );
}

/**
 * Метка всегда видима — плейсхолдер её не заменяет: он исчезает, как только
 * начинают печатать, и человек остаётся с полем без имени.
 */
export function Field({
    label,
    hint,
    error,
    action,
    children,
    className,
}: {
    label: string;
    hint?: string;
    error?: string;
    action?: ReactNode;
    children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby': string | undefined }) => ReactNode;
    className?: string;
}) {
    const id = useId();
    const messageId = `${id}-message`;
    const described = error || hint ? messageId : undefined;

    return (
        <div className={cn('space-y-2', className)}>
            <div className="flex items-baseline justify-between gap-3">
                <label htmlFor={id} className="eyebrow text-bark">
                    {label}
                </label>
                {action}
            </div>
            {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': described })}
            {error ? (
                <p id={messageId} className="flex items-center gap-1.5 text-sm text-rust">
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                    {error}
                </p>
            ) : (
                hint && (
                    <p id={messageId} className="text-sm text-bark-soft">
                        {hint}
                    </p>
                )
            )}
        </div>
    );
}
