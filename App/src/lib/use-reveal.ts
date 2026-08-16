import { useEffect, useRef } from 'react';

/**
 * Показывает блок, когда он доезжает до экрана, и больше за ним не следит.
 * Одного наблюдателя на страницу хватает: элементы регистрируются по
 * атрибуту, отдельного состояния React на каждый блок не заводим.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;

        const targets = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));
        if (targets.length === 0) return;

        if (
            typeof IntersectionObserver === 'undefined' ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            targets.forEach((el) => el.setAttribute('data-shown', 'true'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.setAttribute('data-shown', 'true');
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
        );

        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return ref;
}
