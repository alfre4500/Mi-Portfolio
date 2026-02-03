import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguageStore } from "#store/language.js";
import { getTranslation } from "#constants/translations.js";

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

  const letters = Array.from(container.querySelectorAll("span[aria-hidden='true']"));
  const { min, max } = FONT_WEIGHTS[type];

  // centers of each letter (used as a fallback). Recomputed on resize.
  let centers = [];

  const calculatePositions = () => {
    centers = letters.map((letter) => {
      const r = letter.getBoundingClientRect();
      return r.left + r.width / 2;
    });
  };

  // Initialize centers
  calculatePositions();

  const animateLetters = (element, weight) => {
    gsap.to(element, {
      duration: 0.22,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
      overwrite: "auto",
    });
  };

  const getHoveredLetterIndex = (clientX, clientY) => {
    const el = document.elementFromPoint(clientX, clientY);
    if (!el) return -1;
    // climb up until we find an aria-hidden letter inside this container
    let node = el;
    while (node && node !== container) {
      if (node.nodeType === 1 && node.getAttribute && node.getAttribute('aria-hidden') === 'true') {
        return letters.indexOf(node);
      }
      node = node.parentNode;
    }
    // fallback: find nearest by precomputed centers
    let nearest = -1;
    let bestDist = Infinity;
    centers.forEach((c, i) => {
      const d = Math.abs(c - clientX);
      if (d < bestDist) { bestDist = d; nearest = i; }
    });
    return nearest;
  };

  const handleMouseMove = (e) => {
    const hoveredIndex = getHoveredLetterIndex(e.clientX, e.clientY);
    if (hoveredIndex === -1) return;

    // Use index distance to compute intensity — stable vs layout shifts
    const sigma = 2; // controls spread
    letters.forEach((el, i) => {
      const idxDist = Math.abs(i - hoveredIndex);
      const intensity = Math.exp(-(idxDist ** 2) / (2 * sigma * sigma));
      const newWeight = min + (max - min) * intensity;
      animateLetters(el, newWeight);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((el) => animateLetters(el, FONT_WEIGHTS[type].default));
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
  const language = useLanguageStore((state) => state.language);
  const welcomeSubtitle = getTranslation(language, "welcomeSubtitle");
  const welcomeTitle = getTranslation(language, "welcomeTitle");
  const desktopOnly = getTranslation(language, "desktopOnly");

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
        {renderText(welcomeSubtitle, "", 100)}
      </p>
      
      <h1 ref={titleRef} className="mt-7 cursor-default text-9xl italic font-georama">
        {renderText(welcomeTitle, "", 400)}
      </h1>

      <div className="lg:hidden mt-10 text-center px-4">
        <p>{desktopOnly}</p>
      </div>
    </section>
  );
};

export default Welcome;