import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultLanguage = typeof window !== 'undefined' && window.navigator.language ? (window.navigator.language.startsWith('en') ? 'en' : 'es') : 'es';

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: defaultLanguage,
      
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

