import { ECO_CLASSES } from '../lib/eco';

/**
 * Ожидание нарисовано той же шкалой, что и этикетка: ступени набегают
 * по очереди. Спиннер здесь был бы ничьим — а это уже узнаваемый знак.
 */
export function SuspenseFallback() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-paper px-6">
            <div className="w-full max-w-xs" role="status" aria-live="polite">
                <p className="eyebrow text-bark">Loading</p>
                <div className="mt-4 flex flex-col gap-1.5">
                    {ECO_CLASSES.map((grade, index) => (
                        <span
                            key={grade}
                            className="h-4 animate-draw-bar bg-fibre"
                            style={{
                                width: `${46 + index * 13}%`,
                                clipPath: 'polygon(0 0, calc(100% - 0.6rem) 0, 100% 50%, calc(100% - 0.6rem) 100%, 0 100%)',
                                animationDelay: `${index * 90}ms`,
                            }}
                        />
                    ))}
                </div>
                <span className="sr-only">Loading the page</span>
            </div>
        </div>
    );
}
