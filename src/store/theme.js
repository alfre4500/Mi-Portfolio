import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark', // 'light' o 'dark'
      
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
      })),
      
      setTheme: (theme) => set({
        theme: theme
      })
    }),
    {
      name: 'theme-store', // nombre de la clave en localStorage
    }
  )
);
