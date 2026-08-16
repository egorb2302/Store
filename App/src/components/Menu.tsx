import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router';
import useAuthStore from '../stores/auth';
import { Button } from './ui/button';
import { NAV_LINKS } from './nav-links';

/**
 * Мобильная навигация — выезжающая панель, а не выпадашка под кнопкой.
 * Выпадашка перекрывала контент и не закрывалась ни по Escape, ни по переходу:
 * человек тыкал ссылку, страница менялась, меню оставалось висеть.
 */
export default function DropdownMenu({ state, onClose }: { state: boolean; onClose: () => void }) {
    const { isAuth } = useAuthStore();
    const closeRef = useRef<HTMLButtonElement>(null);
    const { pathname } = useLocation();

    useEffect(() => {
        if (state) onClose();
        // Закрываем при смене маршрута; на открытие/закрытие само по себе не реагируем.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    useEffect(() => {
        if (!state) return;

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKey);
        closeRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', onKey);
        };
    }, [state, onClose]);

    if (!state) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            <button
                type="button"
                className="absolute inset-0 h-full w-full cursor-default bg-pine/60 backdrop-blur-[2px]"
                onClick={onClose}
                aria-label="Close menu"
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                className="tex-pine absolute right-0 top-0 flex h-full w-[min(20rem,85vw)] animate-slide-in flex-col bg-pine px-6 py-5 shadow-band"
            >
                <div className="flex items-center justify-between">
                    <span className="eyebrow text-paper/60">Menu</span>
                    <Button
                        ref={closeRef}
                        variant="onDarkOutline"
                        size="icon"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" aria-hidden />
                    </Button>
                </div>

                <nav className="mt-8 flex flex-col">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `border-b border-paper/12 py-4 font-display text-2xl font-bold transition-colors duration-200 ${
                                    isActive ? 'text-sprout' : 'text-paper hover:text-sprout'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3 pt-8">
                    {isAuth ? (
                        <NavLink to="/profile">
                            <Button variant="onDark" size="lg" className="w-full">
                                Profile
                            </Button>
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to="/signup">
                                <Button variant="onDark" size="lg" className="w-full">
                                    Create account
                                </Button>
                            </NavLink>
                            <NavLink to="/login">
                                <Button variant="onDarkOutline" size="lg" className="w-full">
                                    Sign in
                                </Button>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
