import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControlls } from "#components";
import { locations } from "#constants";
import { useLanguageStore } from "#store/language.js";
import { useWindowStore } from "#store/window.js"; // Añadido para saber si la ventana está abierta
import { getTranslation } from "#constants/translations.js";
import { MapPin, Briefcase, Mail, GraduationCap } from "lucide-react";

// Agregamos 'id' a las props, ya que WindowWrapper se lo pasa al componente hijo
const About = ({ id }) => {
  const language = useLanguageStore((state) => state.language);
  const aboutLabel = getTranslation(language, "aboutTitle") || "Sobre mí";
  
  // 1. Hooks para la animación
  const { windows } = useWindowStore();
  const isOpen = windows?.[id || "about"]?.isOpen;
  const contentRef = useRef(null);

  const aboutData = locations.about.children;
  const profileImage = aboutData.find((item) => item.fileType === "img")?.imageUrl || "/images/yop.jpg";
  const description = aboutData.find((item) => item.fileType === "txt")?.description?.[0] || "¡Hola! Soy un desarrollador Frontend...";

  // 2. Coreografía de la animación
  useGSAP(() => {
    if (!isOpen || !contentRef.current) return;

    // Seleccionamos los elementos específicos dentro del contenedor
    const leftCol = contentRef.current.querySelector('.about-left-col');
    const textContent = contentRef.current.querySelector('.about-text');
    const cards = contentRef.current.querySelectorAll('.about-card');

    // Creamos una línea de tiempo para controlar la secuencia
    const tl = gsap.timeline({
      delay: 0.3 // Esperamos 300ms a que la ventana termine su "zoom" de apertura
    });

    // A. Aparece la foto de perfil desde la izquierda
    tl.fromTo(leftCol,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    )
    // B. Aparece el texto principal desde abajo (inicia un poco antes de que termine la foto con "-=0.3")
    .fromTo(textContent,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    )
    // C. Cascada (Stagger) de las tarjetas de información con un ligero rebote
    .fromTo(cards,
      { opacity: 0, y: 20, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.4, 
        stagger: 0.1, // <-- Esta es la magia: 0.1s entre cada tarjeta
        ease: "back.out(1.5)" 
      },
      "-=0.3"
    );

  }, [isOpen]); // Se vuelve a ejecutar cada vez que se abre la ventana

  return (
    <>
      <div id="window-header">
        <WindowControlls target="about" />
        <h3 className="flex-1 text-center font-semibold text-sm tracking-wide" style={{ color: "var(--text-primary)" }}>
          {aboutLabel}
        </h3>
        <div className="w-13" /> 
      </div>

      {/* Agregamos el ref al contenedor principal */}
      <div ref={contentRef} className="p-6 flex flex-col md:flex-row gap-8 items-center md:items-start transition-colors duration-300">
        
        {/* Columna Izquierda: Agregamos clase 'about-left-col' */}
        <div className="about-left-col w-full md:w-1/3 flex flex-col items-center text-center">
          <div className="relative group">
            <img 
              src={profileImage} 
              alt="Alfredo" 
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-2xl border-4 transition-transform duration-300 group-hover:scale-105" 
              style={{ borderColor: "var(--bg-secondary)" }}
            />
            <div 
              className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 border-4 rounded-full shadow-lg" 
              style={{ borderColor: "var(--window-bg)" }}
              title="Disponible para trabajar"
            ></div>
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Alfredo</h2>
          <p className="text-sm font-bold text-blue-500 mt-1 uppercase tracking-wider">Frontend Developer</p>
        </div>

        {/* Columna Derecha */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          
          {/* Contenedor de texto: Agregamos clase 'about-text' */}
          <div className="about-text">
            <h3 className="text-xl font-bold mb-4 border-b pb-2" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>
              Acerca de mí
            </h3>
            <p className="text-sm leading-relaxed mb-6 text-pretty" style={{ color: "var(--text-secondary)" }}>
              {description}
            </p>
          </div>

          {/* Grid de Estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 select-none">
            {/* A cada tarjeta le agregamos la clase 'about-card' */}
            
            <div className="about-card flex items-center gap-4 p-4 rounded-xl shadow-sm border transition-all hover:-translate-y-1 hover:shadow-md cursor-default" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
              <div className="p-2.5 bg-blue-100/50 dark:bg-blue-500/20 rounded-lg">
                <MapPin className="text-blue-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--text-secondary)" }}>Ubicación</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>San Juan, Argentina</p>
              </div>
            </div>

            <div className="about-card flex items-center gap-4 p-4 rounded-xl shadow-sm border transition-all hover:-translate-y-1 hover:shadow-md cursor-default" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
              <div className="p-2.5 bg-green-100/50 dark:bg-green-500/20 rounded-lg">
                <Briefcase className="text-green-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--text-secondary)" }}>Experiencia</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>+1 Año (Indep.)</p>
              </div>
            </div>

            <div className="about-card flex items-center gap-4 p-4 rounded-xl shadow-sm border transition-all hover:-translate-y-1 hover:shadow-md cursor-default" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
              <div className="p-2.5 bg-purple-100/50 dark:bg-purple-500/20 rounded-lg">
                <GraduationCap className="text-purple-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--text-secondary)" }}>Estudios</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>Tec. Universitaria</p>
              </div>
            </div>

            <div className="about-card flex items-center gap-4 p-4 rounded-xl shadow-sm border transition-all hover:-translate-y-1 hover:shadow-md cursor-default" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
              <div className="p-2.5 bg-red-100/50 dark:bg-red-500/20 rounded-lg">
                <Mail className="text-red-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--text-secondary)" }}>Contacto</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>Disponible</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

const AboutWindow = WindowWrapper(About, "about");

export default AboutWindow;