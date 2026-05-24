import type { Product, User } from "../types/types";

const API_PRODUCTS: string = 'http://localhost:3000/products'
const API_USERS: string = 'http://localhost:3000/users'
const API_ORDERS: string = 'http://localhost:3000/orders'

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_PRODUCTS}`);
    if (!response.ok) throw new Error('Error of fetching all products')
    const data = await response.json();
    return data
}

export const fetchProduct = async (id: number): Promise<Product> => {
    const response = await fetch(`${API_PRODUCTS}/${id}`);
    if (!response.ok) throw new Error(`Error of fetching one product with id ${id}`)
    const data = await response.json();
    return data
}

export const removeProduct = async (id: number): Promise<Product> => {
    const response = await fetch(`${API_PRODUCTS}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'applications/json' },
    });
    if (!response.ok) throw new Error(`Error of deleting product with id ${id}`)
    return response.json()
}

export const fetchUsers = async (): Promise<User> => {
    const response = await fetch(`${API_USERS}`);
    if (!response.ok) throw new Error('Error of fetching all users')
    const data = await response.json();
    return data
}

export const fetchUser = async (id: string): Promise<User> => {
    const response = await fetch(`${API_USERS}/${id}`);
    if (!response.ok) throw new Error(`Error of fetching one user with id ${id}`)
    const data = await response.json();
    return data
}

export const addUser = async (prop: User): Promise<User> => {
    const response = await fetch(`${API_USERS}`, {
        method: 'POST',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify(prop)
    });
    if (!response.ok) throw new Error(`Error of adding User`)
    const data = response.json()
    return data;
}

export const removeUser = async (id: string): Promise<Product> => {
    const response = await fetch(`${API_USERS}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'applications/json' },
    });
    if (!response.ok) throw new Error(`Error of deleting user with id ${id}`)
    return response.json()
}

export const patchUser = async (id: string, patch: Omit<User, 'id'>): Promise<User> => {
    const response = await fetch(`${API_USERS}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch)
    });
    if (!response.ok) throw new Error(`Error of patching user with id ${id}`)
    const data = response.json()
    return data
}

export const fetchOrders = async (): Promise<Product[]> => {
    const response = await fetch(`${API_ORDERS}`);
    if (!response.ok) throw new Error('Error of fetching orders')
    const data = await response.json();
    return data
}

export const addOrder = async (prop: Product): Promise<Product> => {
    const response = await fetch(`${API_ORDERS}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prop)
    });
    if (!response.ok) throw new Error('Error of adding order')
    const data = await response.json()
    return data
} 


