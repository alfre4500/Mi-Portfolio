import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return (
    <span aria-label={text} role="text">
      {[...text].map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          // NOTA: Quitamos 'will-change-transform' porque animamos fuentes, no transformaciones.
          // 'inline-block' es vital para que funcione el width/height en los cálculos.
          className={`${className} inline-block`} 
          style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const setupTextHover = (container, type) => {
  // Guard clause: si no hay contenedor, devolvemos limpieza vacía para evitar errores
  if (!container) return () => {};

  const letters = container.querySelectorAll("span[aria-hidden='true']");
  const { min, max } = FONT_WEIGHTS[type];
  
  let letterData = [];

  const calculatePositions = () => {
    // Calculamos esto UNA vez.
    const { left: containerLeft } = container.getBoundingClientRect();
    
    letterData = Array.from(letters).map((letter) => {
      const { left, width } = letter.getBoundingClientRect();
      return {
        element: letter,
        // Al guardar 'center' relativo al contenedor, la matemática es más simple luego
        center: left - containerLeft + width / 2 
      };
    });
  };

  // Inicializar posiciones
  calculatePositions();

  const animateLetters = (letter, weight) => {
    gsap.to(letter, {
      duration: 0.25,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
      overwrite: "auto",
    });
  };

  const handleMouseMove = (e) => {
    // Aquí sí necesitamos getBoundingClientRect del contenedor para saber dónde está el mouse
    // relativo a él. Esto es barato (1 sola lectura por frame vs 20 lecturas).
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letterData.forEach(({ element, center }) => {
      const distance = Math.abs(mouseX - center);
      // Ajuste de intensidad: 2500 controla el radio de dispersión del efecto
      const intensity = Math.exp(-(distance ** 2) / 2500);
      const newWeight = min + (max - min) * intensity;
      
      animateLetters(element, newWeight);
    });
  };

  const handleMouseLeave = () => {
    letterData.forEach(({ element }) => 
      animateLetters(element, FONT_WEIGHTS[type].default)
    );
  };

  window.addEventListener("resize", calculatePositions);
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    window.removeEventListener("resize", calculatePositions);
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const cleanupTitle = setupTextHover(titleRef.current, "title");
    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      cleanupTitle();
      cleanupSubtitle();
    };
  }, []);

  return (
    <section id="welcome" className="flex flex-col items-center justify-center h-screen">
      <p ref={subtitleRef} className="cursor-default text-3xl font-georama">
        {renderText("Hola soy Alfredo Bienvenidos a mi", "", 100)}
      </p>
      
      <h1 ref={titleRef} className="mt-7 cursor-default text-9xl italic font-georama">
        {renderText("Portfolio", "", 400)}
      </h1>

      <div className="lg:hidden mt-10 text-center px-4">
        <p>Este Portfolio está diseñado para escritorio y tablet.</p>
      </div>
    </section>
  );
};

export default Welcome;