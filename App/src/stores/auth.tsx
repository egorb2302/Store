import { create } from "zustand";
import type { AuthType } from "../types/types";
import { persist } from "zustand/middleware";

const useAuthStore = create<AuthType>()(
    persist(
        (set) => ({
            user: null,
            isAuth: false,
            setUser: (user) => set({ user, isAuth: !!user }),
            logout: () => {
               localStorage.removeItem('token');
               set({ user: null, isAuth: false }) 
            }
        }),
        {
            name: 'auth-storage'
        }
    )
)

export default useAuthStore;