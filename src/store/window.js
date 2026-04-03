import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { WINDOW_CONFIG, INITIAL_Z_INDEX } from '../constants/index.js'; 

export const useWindowStore = create(immer((set) => ({

    windows: WINDOW_CONFIG,
    nextzindex: INITIAL_Z_INDEX + 1,

    openWindow: (windowkey, data = null) => set((state) => {
        const win = state.windows[windowkey];

        if (!win) {
            console.warn(`La ventana "${windowkey}" no existe en WINDOW_CONFIG`);
            return;
        }
        
        win.isOpen = true;
        win.zIndex = state.nextzindex;
        win.isPending = false;
  
        win.data = data ?? win.data; 
        state.nextzindex++;
    }),

    closeWindow: (windowkey) => set((state) => {
        const win = state.windows[windowkey];
        if (!win) return; // Protección

        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX; 
        win.data = null;
        win.isPending = false;
    }),

    closeAllWindows: () => set((state) => {
        Object.values(state.windows).forEach((win) => {
            win.isOpen = false;
            win.zIndex = INITIAL_Z_INDEX;
            win.data = null;
            win.isPending = false;
        });
    }),

    closePendingWindows: () => set((state) => {
        const openWindows = Object.values(state.windows).filter((w) => w.isOpen);
        if (openWindows.length <= 1) return;

        const maxZ = Math.max(...openWindows.map((w) => w.zIndex));

        openWindows.forEach((win) => {
            if (win.zIndex < maxZ) {
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
                win.isPending = false;
            }
        });
    }),

    markWindowPending: (windowkey) => set((state) => {
        const win = state.windows[windowkey];
        if (!win) return;
        if (!win.isOpen) return;

        win.isPending = true;
    }),

    focusWindow: (windowkey) => set((state) => {
        const win = state.windows[windowkey];
        if (!win) return; // Protección

        win.zIndex = state.nextzindex++;
        win.isPending = false;
    }),
})));

export default useWindowStore;