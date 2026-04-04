import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useRef } from "react";

// Registramos el plugin fuera
gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        // 1. Hooks
        const { focusWindow, windows } = useWindowStore();
        const ref = useRef(null);

        // 2. Datos seguros
        const win = windows?.[windowKey];
        const isOpen = win?.isOpen ?? false;
        const zIndex = win?.zIndex ?? 0;

        // 3. Hook de Animación (Apertura)
        useGSAP(() => {
            if (!win || !ref.current) return;
            const el = ref.current;

            if (isOpen) {
                el.style.display = "block";
                if (window.innerWidth > 768) {
                    // Full animation on desktop
                    gsap.fromTo(el, 
                        { scale: 0.8, opacity: 0, y: 40 }, 
                        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
                    );
                } else {
                    // Simple fade on mobile
                    gsap.fromTo(el, 
                        { opacity: 0 }, 
                        { opacity: 1, duration: 0.2, ease: "power1.out" }
                    );
                }
            } else {
                el.style.display = "none";
            }
        }, [isOpen]); 

        // 4. Hook Draggable
        useGSAP(() => {
            if (!win || !ref.current || !isOpen) return;
            
            // Only enable dragging on screens wider than 768px
            if (window.innerWidth <= 768) return;
            
            const dragInstance = Draggable.create(ref.current, {
                type: "x,y",
                onPress: () => focusWindow(windowKey), 
                zIndexBoost: false,
                // bounds: "body" // Descomenta si quieres limitar el movimiento
            });

            return () => {
                if(dragInstance[0]) dragInstance[0].kill();
            }
        }, [isOpen]); 

        // 5. Retorno condicional
        if (!win) return null;

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }} 
                className={`absolute ${!isOpen ? 'hidden' : ''} app-window`}
            >
                {/* CAMBIO AQUÍ: Pasamos el 'id' al componente hijo */}
                {/* Esto permite que Finder sepa si es 'finder' o 'about' */}
                <Component id={windowKey} {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;

    return Wrapped;
};

export default WindowWrapper;