import { ChevronRight, LogOut, Mail, ShieldCheck, Sprout, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { buttonVariants } from '../components/ui/button-variants';
import { cn } from '../lib/utils';
import useAuthStore from '../stores/auth';

export default function Profile({ onLogout }: { onLogout: () => void }) {
    const { user } = useAuthStore();
    const nav = useNavigate();

    // Тут стоял throw в рендере. Маршрут защищён, но защита падает на один кадр
    // раньше данных, и вместо профиля можно было получить белый экран.
    if (!user) {
        return (
            <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
                <h1 className="text-4xl font-extrabold text-pine">You are signed out</h1>
                <p className="mt-4 text-bark">Sign in again to see your account</p>
                <Link to="/login" className={cn(buttonVariants({ size: 'lg' }), 'mt-8')}>
                    Sign in
                </Link>
            </div>
        );
    }

    const handleLogout = () => {
        onLogout();
        nav('/home');
    };

    const details = [
        { label: 'Full name', value: user.name || 'Not specified', icon: UserIcon },
        { label: 'Email', value: user.email, icon: Mail },
        { label: 'Password', value: '••••••••', icon: ShieldCheck },
    ];

    return (
        <div className="wrap py-12 sm:py-16">
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-1 font-mono text-xs text-bark-soft">
                    <li>
                        <Link to="/home" className="hover:text-moss">
                            Home
                        </Link>
                    </li>
                    <ChevronRight className="h-3 w-3" aria-hidden />
                    <li className="text-bark" aria-current="page">
                        Profile
                    </li>
                </ol>
            </nav>

            <header className="mt-8">
                <p className="eyebrow text-bark">Account</p>
                <h1 className="mt-3 text-4xl font-extrabold text-pine sm:text-5xl">
                    {user.name || 'Your profile'}
                </h1>
                <p className="mt-3 font-mono text-sm text-bark">{user.email}</p>
            </header>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                <section className="tex-pulp h-fit rounded-card border border-fibre bg-pulp p-7">
                    <div className="flex items-center gap-4">
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-pine font-display text-2xl font-extrabold text-sprout">
                            {(user.name || user.email).charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                            <p className="truncate font-display text-xl font-bold text-pine">
                                {user.name || 'User'}
                            </p>
                            <p className="mt-1 flex items-center gap-1.5 text-sm text-moss">
                                <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden />
                                Active account
                            </p>
                        </div>
                    </div>

                    <Button variant="danger" className="mt-7 w-full" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" aria-hidden />
                        Sign out
                    </Button>
                </section>

                <div className="space-y-8">
                    <section className="rounded-card border border-fibre bg-paper p-7">
                        <h2 className="text-2xl font-bold text-pine">Account details</h2>
                        <dl className="mt-6 divide-y divide-fibre">
                            {details.map(({ label, value, icon: Icon }) => (
                                <div key={label} className="flex items-center gap-4 py-4">
                                    <Icon className="h-4 w-4 shrink-0 text-bark-soft" aria-hidden />
                                    <dt className="w-32 shrink-0 text-sm text-bark">{label}</dt>
                                    <dd className="min-w-0 flex-1 truncate font-mono text-[0.9375rem] text-pine">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    {/* Пустое состояние вместо выдуманных «12 заказов» и «45 кг CO₂»:
                        считать их пока не из чего, а нарисованные цифры в личном
                        кабинете читаются как обман, а не как заглушка. */}
                    <section className="tex-pine rounded-card bg-pine p-7 sm:p-9">
                        <h2 className="flex items-center gap-2 text-2xl font-bold text-paper">
                            <Sprout className="h-5 w-5 text-sprout" aria-hidden />
                            Your green impact
                        </h2>
                        <p className="mt-3 max-w-md text-paper/70">
                            Once your first order ships, this is where you will see what it added up to: CO₂e
                            avoided, recycled material bought, devices kept out of landfill
                        </p>
                        <Link
                            to="/products"
                            className={cn(buttonVariants({ variant: 'onDark' }), 'mt-7')}
                        >
                            Start with the catalog
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
}
