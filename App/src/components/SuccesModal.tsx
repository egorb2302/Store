import { Check } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { ModalType } from '../types/types';
import { Button } from './ui/button';

export default function SuccessModal({ state, message, onClose }: ModalType) {
    const okRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!state) return;

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', onKey);
        okRef.current?.focus();
        return () => document.removeEventListener('keydown', onKey);
    }, [state, onClose]);

    if (!state) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
                type="button"
                className="absolute inset-0 h-full w-full cursor-default bg-pine/70"
                onClick={onClose}
                aria-label="Close"
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="success-title"
                className="relative w-full max-w-sm rounded-card border border-fibre bg-paper p-8 text-center shadow-band"
            >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sprout">
                    <Check className="h-7 w-7 text-pine" aria-hidden />
                </span>
                <h2 id="success-title" className="mt-5 text-2xl font-bold text-pine">
                    Done
                </h2>
                <p className="mt-2 text-bark">{message}</p>
                <Button ref={okRef} onClick={onClose} className="mt-6 w-full">
                    Close
                </Button>
            </div>
        </div>
    );
}
