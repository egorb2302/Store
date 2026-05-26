import { create } from "zustand";
import type { AuthType } from "../types/types";
import { persist } from "zustand/middleware";
import { fetchUsers } from '../api/api';

const useAuthStore = create<AuthType>()(
    persist(
        (set, get) => ({
            user: null,
            isAuth: false,
            setUser: (user) => set({ user, isAuth: !!user }),
            logout: () => {
               localStorage.removeItem('token');
               set({ user: null, isAuth: false }) 
            },
            checkAuth: async () => {
                try {
                    const currentUser = get().user;
                    if (!currentUser) {
                        set({ isAuth: false });
                        return;
                    }

                    const allUsers = await fetchUsers();
                    const match = allUsers.find(u => u.id === currentUser.id);
                    
                    set({ 
                        isAuth: !!match, 
                    });
                } catch (error) {
                    console.error('Check auth error:', error);
                    set({ isAuth: false });
                }}
            }),
        {
            name: 'auth-storage'
        }
    )
)

export default useAuthStore;