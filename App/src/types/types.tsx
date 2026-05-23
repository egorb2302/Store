export interface Product {
    id: number,
    name: string,
    price: number,
    category: Category,
    brand: string,
    image: string,
    inStock: boolean,
    description: string,
    rating: number,
    reviews: number,
    specs: LaptopSpecs
        | PhoneSpecs
        | AudioSpecs
        | AccesoriesSpecs
        | MonitorSpecs
        | TabletSpecs
        | ComponentSpecs
}

type LaptopSpecs = {
    processor: string,
    ram: string,
    storage: string,
    display: string,
}

type PhoneSpecs = {
    processor: string,
    storage: string,
    display: string,
    camera: string,
}

type AudioSpecs = {
    type: string,
    battery: string,
    noiseCanceling: boolean,
    wireless: boolean,
}

type AccesoriesSpecs = {
    backlight?: boolean,
    connection?: string,
    type?: string,
    battery?: string,
    dpi?: string,
    buttons?: string 
}

type MonitorSpecs = {
    size: string,
    resolutioon: string,
    refreshRate: string,
    responseTime: string,
}

type TabletSpecs = {
    applePencil: boolean,
    processor: string,
    storage: string,
    display: string,
}

type ComponentSpecs = {
    memory: string,
    dlss: string,
    rayTracing: boolean,
    ports: string
}

export interface User {
    id: string,
    email: string,
    password: string,
    name?: string
}

type Category = "laptops" 
    | "phones" 
    | "audio" 
    | "accesories" 
    | "monitors"
    | "tablests"
    | "components"