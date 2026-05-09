import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowStore } from "../store/window.js";
import { useLanguageStore } from "#store/language.js";
import { getTranslation } from "#constants/translations.js";
import { locations } from "#constants/index.js"; 

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const language = useLanguageStore((state) => state.language);
  const dockApps = getTranslation(language, "dockApps");
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    // --- NUEVO: SECUENCIA DE ARRANQUE (Entrada del Dock) ---
    // Viene desde 100px más abajo, completamente transparente
    gsap.from(dock, {
      y: 120,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      delay: 1.2, // Esperamos 1.2 segundos para que el texto de Welcome aparezca primero
      clearProps: "opacity,transform" // Limpia los estilos al terminar para no romper tu CSS original
    });
    // -------------------------------------------------------

    const icons = dock.querySelectorAll(".dock-icon");
    let iconData = [];

    const calculatePositions = () => {
      const { left: dockLeft } = dock.getBoundingClientRect();
      iconData = Array.from(icons).map((icon) => {
        const { left, width } = icon.getBoundingClientRect();
        return {
          element: icon,
          center: left - dockLeft + width / 2 
        };
      });
    };

    calculatePositions();

    const handleMouseMove = (e) => {
      const { left: dockLeft } = dock.getBoundingClientRect();
      const mouseX = e.clientX - dockLeft;

      iconData.forEach(({ element, center }) => {
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2) / 2500); 

        gsap.to(element, {
          scale: 1 + 0.2 * intensity,
          y: -10 * intensity,
          duration: 0.2,
          ease: "power2.out",
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

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    window.addEventListener("resize", calculatePositions);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove); 
      dock.removeEventListener("mouseleave", resetIcons);
      window.removeEventListener("resize", calculatePositions);
    };
  }, []);

  const toggleApp = (id, canOpen) => {
    if (!canOpen) return;

    if (id === "photos") {
      const aboutWin = windows["about"];
      if (aboutWin?.isOpen) {
        closeWindow("about");
      } else {
        openWindow("about", { ...locations.about, isSpecialView: true });
      }
      return;
    }

    if (id === "finder") {
      const finderWin = windows["finder"];
      if (finderWin?.isOpen) {
        closeWindow("finder");
      } else {
        openWindow("finder", { ...locations.work, isSpecialView: false });
      }
      return;
    }

    const window = windows[id];
    if (window?.isOpen) {
      closeWindow(id);
    } else {
      openWindow(id);
    }
  };

  const handleIconClick = (e, id, canOpen) => {
    if (!canOpen) return;

    gsap.to(e.currentTarget, {
      y: -35,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
      overwrite: "auto"
    });

    toggleApp(id, canOpen);
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {/* Nota: Asegúrate de que el Dock no tenga una opacidad forzada en tu CSS que pelee con GSAP */}
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
              onClick={(e) => handleIconClick(e, id, canOpen)}
            >
              <img
                src={`/images/${icon}`}
                alt={tooltip || name}
                loading="lazy"
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