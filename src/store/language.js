import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: 'es', // 'es' para español, 'en' para inglés
      
      toggleLanguage: () => set((state) => ({
        language: state.language === 'es' ? 'en' : 'es'
      })),
      
      setLanguage: (lang) => set({
        language: lang
      })
    }),
    {
      name: 'language-store', // nombre de la clave en localStorage
    }
  )
);
