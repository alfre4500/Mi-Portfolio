import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={`${className} inline-block`} // inline-block ayuda a que las transformaciones funcionen mejor
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }} // CORREGIDO: Comillas en 'wght'
    >
      {/* Si es un espacio, usamos \u00A0 (non-breaking space) para que no colapse */}
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max } = FONT_WEIGHTS[type];

  const animateLetters = (letter, weight, duration = 0.25) => {
   
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    // getBoundingClientRect es costoso, idealmente sácalo fuera si el layout no cambia, 
    // pero para este efecto está bien aquí.
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      // Calculamos distancia desde el centro de la letra
      const distance = Math.abs(mouseX - (l - left + w / 2));
      // Ajusta el divisor (2000) si quieres que el efecto sea más ancho o angosto
      const intensity = Math.exp(-(distance ** 2) / 2500); 

      animateLetters(letter, min + (max - min) * intensity);
    });
  };


  // Resetear al salir el mouse (Opcional pero recomendado para que no se quede trabado)
  const handleMouseLeave = () => {
      letters.forEach((letter) => animateLetters(letter, FONT_WEIGHTS[type].default));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  // CORREGIDO: Devolvemos una función de limpieza
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    // Guardamos las funciones de limpieza
    const cleanupTitle = setupTextHover(titleRef.current, "title");
    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");

    // useGSAP ejecutará esto cuando el componente se desmonte
    return () => {
      if (cleanupTitle) cleanupTitle();
      if (cleanupSubtitle) cleanupSubtitle();
    };
  }, []); // El array vacío está bien aquí

  return (
    <section id="welcome" className="flex flex-col items-center justify-center h-screen">
       {/* Nota: 'font-sans serif' en className es confuso. O usas font-sans O font-serif generalmente */}
      <p ref={subtitleRef} className="cursor-default">
        {renderText("Hola soy Alfredo Bienvenidos a mi", "text-3xl font-georama", 100)}
      </p>
      <h1 ref={titleRef} className="mt-7 cursor-default">
        {renderText("Portfolio", "text-9xl italic font-georama", 400)}
      </h1>
      
      <div className="small-screen mt-10">
        <p>Este Portfolio está diseñado para escritorio y tablet solamente</p>
      </div>
    </section>
  );
};

export default Welcome;