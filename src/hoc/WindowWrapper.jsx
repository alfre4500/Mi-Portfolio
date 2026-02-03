import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
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
                // Usamos fromTo para asegurar la entrada
                gsap.fromTo(el, 
                    { scale: 0.8, opacity: 0, y: 40 }, 
                    { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
                );
            } else {
                el.style.display = "none";
            }
        }, [isOpen]); // Solo depende de si se abre/cierra

        // 4. Hook Draggable (CORREGIDO)
        useGSAP(() => {
            // Solo creamos draggable si la ventana existe y el elemento está en el DOM
            if (!win || !ref.current || !isOpen) return;
            
            const dragInstance = Draggable.create(ref.current, {
                type: "x,y",
                // Esto actualiza el store, pero NO queremos que reinicie el Draggable
                onPress: () => focusWindow(windowKey), 
                zIndexBoost: false,
                // Opcional: Esto ayuda a que el draggable respete los límites si lo necesitas
                // bounds: "body" 
            });

            return () => {
                if(dragInstance[0]) dragInstance[0].kill();
            }
        // CAMBIO CLAVE AQUÍ: Usamos [isOpen] en lugar de [win]
        // Así, al hacer click (focusWindow), el draggable NO se reinicia.
        }, [isOpen]); 

        // 5. Retorno condicional al final
        if (!win) return null;

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }} 
                className={`absolute ${!isOpen ? 'hidden' : ''}`}
            >
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;

    return Wrapped;
};

export default WindowWrapper;