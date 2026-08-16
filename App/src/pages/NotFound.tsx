import { Link, useLocation } from 'react-router';
import { buttonVariants } from '../components/ui/button-variants';
import { cn } from '../lib/utils';

export default function NotFound() {
    const { pathname } = useLocation();

    return (
        <div className="wrap flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
            <p className="eyebrow text-bark">Error 404</p>
            <h1 className="mt-5 text-[clamp(3rem,12vw,7rem)] font-extrabold leading-none text-pine">
                Page not found
            </h1>
            <p className="mt-6 max-w-md text-lg text-bark">
                Nothing lives at this address. It may have moved, or the link may be missing a piece
            </p>
            <p className="mt-4 max-w-full break-all font-mono text-xs text-bark-soft">{pathname}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link to="/home" className={buttonVariants({ size: 'lg' })}>
                    Back to home
                </Link>
                <Link to="/products" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
                    Browse the catalog
                </Link>
            </div>
        </div>
    );
}
