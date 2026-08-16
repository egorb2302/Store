import type { Product } from '../types/types';

/**
 * Один общий рендер вместо switch по категориям.
 *
 * Старый вариант знал только про ноутбуки, телефоны, аудио и мониторы —
 * планшеты, комплектующие и аксессуары получали «характеристики не указаны»,
 * хотя в базе они есть. Теперь показываем то, что реально лежит в товаре,
 * а словарь отвечает только за человеческую подпись.
 */
const LABELS: Record<string, string> = {
    processor: 'Processor',
    ram: 'Memory',
    storage: 'Storage',
    display: 'Display',
    camera: 'Camera',
    type: 'Type',
    battery: 'Battery',
    noiseCanceling: 'Noise cancelling',
    wireless: 'Wireless',
    backlight: 'Backlight',
    connection: 'Connection',
    dpi: 'Sensor',
    buttons: 'Buttons',
    size: 'Size',
    resolutioon: 'Resolution',
    resolution: 'Resolution',
    refreshRate: 'Refresh rate',
    responseTime: 'Response time',
    applePencil: 'Apple Pencil',
    memory: 'Memory',
    dlss: 'DLSS',
    rayTracing: 'Ray tracing',
    ports: 'Ports',
};

function humanize(key: string) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());
}

export default function ProductSpecs({ product }: { product: Product }) {
    const entries = Object.entries(product.specs ?? {}).filter(([, value]) => value !== undefined);

    if (entries.length === 0) {
        return <p className="text-bark">No specifications were published for this device.</p>;
    }

    return (
        <dl className="divide-y divide-fibre">
            {entries.map(([key, value]) => (
                <div key={key} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-3.5">
                    <dt className="text-[0.9375rem] text-bark">{LABELS[key] ?? humanize(key)}</dt>
                    <dd className="font-mono text-[0.9375rem] text-pine">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                    </dd>
                </div>
            ))}
        </dl>
    );
}
