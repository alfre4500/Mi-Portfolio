import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowStore } from "../store/window.js";
import { useLanguageStore } from "#store/language.js";
import { getTranslation } from "#constants/translations.js";

const Dock = () => {
  const {openWindow , closeWindow , windows } = useWindowStore () ;
  const language = useLanguageStore((state) => state.language);
  const dockApps = getTranslation(language, "dockApps");
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return; // Guard clause

    const icons = dock.querySelectorAll(".dock-icon");
    
    // --- OPTIMIZACIÓN DE RENDIMIENTO (Igual que en el texto) ---
    // Guardamos las posiciones iniciales para no leer el DOM en cada movimiento
    let iconData = [];

    const calculatePositions = () => {
      const { left: dockLeft } = dock.getBoundingClientRect();
      
      iconData = Array.from(icons).map((icon) => {
        const { left, width } = icon.getBoundingClientRect();
        return {
          element: icon,
          // Centro relativo al dock
          center: left - dockLeft + width / 2 
        };
      });
    };

    // Calculamos al inicio
    calculatePositions();

    const handleMouseMove = (e) => {
      // Solo leemos el dock una vez por frame
      const { left: dockLeft } = dock.getBoundingClientRect();
      const mouseX = e.clientX - dockLeft;

      iconData.forEach(({ element, center }) => {
        const distance = Math.abs(mouseX - center);
        // Ajusta estos valores para cambiar la "curva" de la lupa
        const intensity = Math.exp(-(distance ** 2) / 2500); 

        gsap.to(element, {
          scale: 1 + 0.2 * intensity, // Escala hasta 1.5x
          y: -10 * intensity, // Sube un poco
          duration: 0.2, // Respuesta rápida
          ease: "power2.out", // 'power.out' no existe, usa power1, power2, etc.
          overwrite: "auto"
        });
      });
    };

    const resetIcons = () => {
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        })
      );
    };

    // Listeners
    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    window.addEventListener("resize", calculatePositions); // Recalcular si cambia tamaño ventana

    
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove); 
      dock.removeEventListener("mouseleave", resetIcons);
   
    };
  }, []);

  const toggleApp = (id, canOpen) => {
    if (!canOpen) return;
    const window = windows[id];
    if(window.isOpen){
      closeWindow (id) ;
    }else{
      openWindow (id) ;
    }
    console.log (windows) ;
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, tooltip, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon origin-bottom shrink-0" 
              aria-label={tooltip || name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={tooltip || name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp(id, canOpen)}
            >
              <img
                src={`/images/${icon}`}
                alt={tooltip || name}
                loading="lazy"
                // Añadí transition-opacity para que no parpadee al cambiar opacidad
                className={`w-full h-full transition-opacity ${canOpen ? "" : "opacity-60"}`}
              />
            </button>
          </div>
        ))}

        <Tooltip
          id="dock-tooltip"
          place="top"
          className="tooltip"
         
        />
      </div>
    </section>
  );
};

export default Dock;