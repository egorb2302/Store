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
        | ComponentSpecs,
    quantity?: number,
}

export type LaptopSpecs = {
    processor: string,
    ram: string,
    storage: string,
    display: string,
}

export type PhoneSpecs = {
    processor: string,
    storage: string,
    display: string,
    camera: string,
}

export type AudioSpecs = {
    type: string,
    battery: string,
    noiseCanceling: boolean,
    wireless: boolean,
}

export type AccesoriesSpecs = {
    backlight?: boolean,
    connection?: string,
    type?: string,
    battery?: string,
    dpi?: string,
    buttons?: string 
}

export type MonitorSpecs = {
    size: string,
    resolutioon: string,
    refreshRate: string,
    responseTime: string,
}

export type TabletSpecs = {
    applePencil: boolean,
    processor: string,
    storage: string,
    display: string,
}

export type ComponentSpecs = {
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

interface CartItem extends Product {
    quantity: number
}

export interface StoreType {
    items: CartItem[],
    addItem: (product: Product) => void,
    removeItem: (id: number) => void,
    updateQuantity: (id: number, quantity: number) => void,
    clearCart: () => void,
    getTotalPrice: () => number,
    getTotalItems: () => number
}

export interface AuthType {
    user: User | null,
    isAuth: boolean, 
    setUser: (user: User | null) => void,
    logout: () => void
}