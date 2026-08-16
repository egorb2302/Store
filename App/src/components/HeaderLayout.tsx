import { useEffect, useRef, useState } from 'react';
import { Menu as MenuIcon, ShoppingBag } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';
import { cn } from '../lib/utils';
import useCartStore from '../stores/store';
import useAuthStore from '../stores/auth';
import Subscribe from './Subscribe';
import DropdownMenu from './Menu';
import { NAV_LINKS } from './nav-links';
import { Button } from './ui/button';

/** Тот же шеврон, что и на ступенях индекса — знак магазина собран из него. */
function ChevronMark({ className = '' }: { className?: string }) {
    return (
        <span
            aria-hidden
            className={`inline-block h-5 w-3.5 bg-sprout ${className}`}
            style={{ clipPath: 'polygon(0 0, 55% 0, 100% 50%, 55% 100%, 0 100%)' }}
        />
    );
}

export function Wordmark({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
    return (
        <span className="flex items-center gap-2">
            <ChevronMark />
            <span className="font-display text-2xl font-extrabold tracking-tight">
                <span className={tone === 'dark' ? 'text-paper' : 'text-pine'}>Green</span>
                <span className="text-sprout">Tech</span>
            </span>
        </span>
    );
}

/** Шапка подбирается, как только страница тронулась с места. */
function useScrolled(threshold = 8) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return scrolled;
}

export default function HeaderLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const { getTotalItems } = useCartStore();
    const { isAuth } = useAuthStore();
    const cartCount = getTotalItems();
    const scrolled = useScrolled();

    // Счётчик подпрыгивает только когда товаров стало больше. На удалении и на
    // первом рендере он молчит: подтверждать нужно действие, а не факт.
    const [bump, setBump] = useState(0);
    const previousCount = useRef(cartCount);

    useEffect(() => {
        if (cartCount > previousCount.current) setBump((tick) => tick + 1);
        previousCount.current = cartCount;
    }, [cartCount]);

    return (
        <div className="flex min-h-screen flex-col bg-paper">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-paper focus:px-5 focus:py-3 focus:font-medium focus:text-pine"
            >
                Skip to content
            </a>

            <header
                className={cn(
                    'tex-pine sticky top-0 z-40 bg-pine transition-shadow duration-300',
                    scrolled && 'shadow-band',
                )}
            >
                <div
                    className={cn(
                        'wrap flex items-center justify-between gap-6 transition-[height] duration-300',
                        scrolled ? 'h-15' : 'h-18',
                    )}
                >
                    <NavLink to="/home" aria-label="GreenTech home" className="flex h-11 items-center">
                        <Wordmark />
                    </NavLink>

                    <nav className="hidden lg:flex" aria-label="Main">
                        <ul className="flex items-center gap-1">
                            {NAV_LINKS.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) =>
                                            `rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-200 ${
                                                isActive
                                                    ? 'bg-paper/10 text-sprout'
                                                    : 'text-paper/75 hover:bg-paper/8 hover:text-paper'
                                            }`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <NavLink
                            to="/cart"
                            className="relative flex h-11 w-11 items-center justify-center rounded-full text-paper transition-colors duration-200 hover:bg-paper/10"
                            aria-label={
                                cartCount === 0
                                    ? 'Cart, empty'
                                    : `Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`
                            }
                        >
                            <ShoppingBag className="h-5 w-5" aria-hidden />
                            {cartCount > 0 && (
                                <span
                                    key={bump}
                                    className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 animate-bump items-center justify-center rounded-full bg-sprout px-1 font-mono text-[0.625rem] font-semibold text-pine"
                                    aria-hidden
                                >
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>

                        <div className="hidden md:flex md:items-center md:gap-2">
                            {isAuth ? (
                                <NavLink to="/profile">
                                    <Button variant="onDark" size="sm">
                                        Profile
                                    </Button>
                                </NavLink>
                            ) : (
                                <>
                                    <NavLink to="/login">
                                        <Button variant="onDarkOutline" size="sm">
                                            Sign in
                                        </Button>
                                    </NavLink>
                                    <NavLink to="/signup">
                                        <Button variant="onDark" size="sm">
                                            Create account
                                        </Button>
                                    </NavLink>
                                </>
                            )}
                        </div>

                        <Button
                            variant="onDarkOutline"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={isOpen}
                        >
                            <MenuIcon className="h-5 w-5" aria-hidden />
                        </Button>
                    </div>
                </div>
            </header>

            <DropdownMenu state={isOpen} onClose={() => setIsOpen(false)} />

            <main id="main" className="flex-1">
                <Outlet />
            </main>

            <footer className="tex-pine bg-pine text-paper/70">
                <div className="wrap py-14 sm:py-16">
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr] lg:gap-16">
                        <div>
                            <Wordmark />
                            <p className="mt-5 max-w-sm text-sm leading-relaxed">
                                Refurbished and low-impact electronics. Every device carries a GreenTech Index,
                                so you can compare on more than price
                            </p>
                            <p className="eyebrow mt-6 text-sprout">Free shipping over $500</p>
                        </div>

                        <nav aria-label="Footer">
                            <h2 className="eyebrow text-paper/60">Browse</h2>
                            <ul className="mt-4 space-y-3">
                                {[...NAV_LINKS, { to: '/cart', label: 'Cart' }].map((link) => (
                                    <li key={link.to}>
                                        <NavLink
                                            to={link.to}
                                            className="text-sm transition-colors duration-200 hover:text-sprout"
                                        >
                                            {link.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div>
                            <h2 className="eyebrow text-paper/60">Get the restock list</h2>
                            <p className="mt-4 text-sm leading-relaxed">
                                Refurbished stock moves fast. One email when something good lands, nothing else
                            </p>
                            <Subscribe />
                            <address className="mt-6 space-y-1 font-mono text-xs not-italic text-paper/60">
                                <p>742 Evergreen St, Greenland, OR 00000</p>
                                <p>
                                    <a href="tel:+79982486767" className="hover:text-sprout">
                                        8 (998) 248-67-67
                                    </a>
                                </p>
                                <p>
                                    <a href="mailto:egorb2302@greentechstore.com" className="hover:text-sprout">
                                        egorb2302@greentechstore.com
                                    </a>
                                </p>
                            </address>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col gap-4 border-t border-paper/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-mono text-xs text-paper/60">© 2026 GreenTech</p>
                        <ul className="flex flex-wrap gap-x-6 gap-y-2">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="font-mono text-xs text-paper/60 hover:text-sprout">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
