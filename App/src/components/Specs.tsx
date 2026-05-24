import type { Product, LaptopSpecs, PhoneSpecs, AudioSpecs, MonitorSpecs } from '../types/types'; 

function ProductSpecs({ product }: { product: Product }) {
    switch (product.category) {
        case 'laptops': {
            const laptopSpecs = product.specs as LaptopSpecs;
            return (
                <ul>
                    <li>Процессор: {laptopSpecs.processor}</li>
                    <li>RAM: {laptopSpecs.ram}</li>
                    <li>SSD: {laptopSpecs.storage}</li>
                    <li>Экран: {laptopSpecs.display}</li>
                </ul>
            );
        }
        case 'phones': {
            const phoneSpecs = product.specs as PhoneSpecs;
            return (
                <ul>
                    <li>Процессор: {phoneSpecs.processor}</li>
                    <li>Экран: {phoneSpecs.display}</li>
                    <li>Камера: {phoneSpecs.camera}</li>
                    <li>Память: {phoneSpecs.storage}</li>
                </ul>
            );
        }
        case 'audio': {
            const audioSpecs = product.specs as AudioSpecs;
            return (
                <ul>
                    <li>Тип: {audioSpecs.type}</li>
                    <li>Батарея: {audioSpecs.battery}</li>
                    <li>Шумоподавление: {audioSpecs.noiseCanceling ? 'Да' : 'Нет'}</li>
                </ul>
            );
        }
        case 'monitors': {
            const monitorSpecs = product.specs as MonitorSpecs;
            return (
                <ul>
                    <li>Размер: {monitorSpecs.size}</li>
                    <li>Разрешение: {monitorSpecs.resolutioon}</li>
                    <li>Частота: {monitorSpecs.refreshRate}</li>
                </ul>
            );
        }
        default:
            return <ul><li>Характеристики не указаны</li></ul>;
    }
}

export default ProductSpecs;