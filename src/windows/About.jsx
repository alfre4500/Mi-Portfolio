import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControlls } from "#components";
import { locations } from "#constants";
import { useLanguageStore } from "#store/language.js";
import { getTranslation } from "#constants/translations.js";
import { MapPin, Briefcase, Mail, GraduationCap } from "lucide-react";

const About = () => {
  const language = useLanguageStore((state) => state.language);
  const aboutLabel = getTranslation(language, "aboutTitle") || "Sobre mí";

  const aboutData = locations.about.children;
  const profileImage = aboutData.find((item) => item.fileType === "img")?.imageUrl || "/images/yop.jpg";
  const description = aboutData.find((item) => item.fileType === "txt")?.description?.[0] || "¡Hola! Soy un desarrollador Frontend...";

  return (
    <>
      {/* 1. Cabecera limpia y perfecta */}
      <div id="window-header">
        <WindowControlls target="about" />
        <h3 className="flex-1 text-center font-semibold text-sm tracking-wide" style={{ color: "var(--text-primary)" }}>
          {aboutLabel}
        </h3>
        <div className="w-13" /> {/* Espaciador para centrar */}
      </div>

      {/* 2. Contenido Principal */}
      <div className="p-6 flex flex-col md:flex-row gap-8 items-center md:items-start transition-colors duration-300">
        
        {/* Columna Izquierda: Foto de Perfil */}
        <div className="w-full md:w-1/3 flex flex-col items-center text-center">
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

        {/* Columna Derecha: Descripción y Tarjetas de Info */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4 border-b pb-2" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>
            Acerca de mí
          </h3>
          <p className="text-sm leading-relaxed mb-6 text-pretty" style={{ color: "var(--text-secondary)" }}>
            {description}
          </p>

          {/* Grid de Estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 select-none">
            <div className="flex items-center gap-4 p-4 rounded-xl shadow-sm border transition-all hover:-translate-y-1 hover:shadow-md cursor-default" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
              <div className="p-2.5 bg-blue-100/50 dark:bg-blue-500/20 rounded-lg">
                <MapPin className="text-blue-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--text-secondary)" }}>Ubicación</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>San Juan, Argentina</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl shadow-sm border transition-all hover:-translate-y-1 hover:shadow-md cursor-default" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
              <div className="p-2.5 bg-green-100/50 dark:bg-green-500/20 rounded-lg">
                <Briefcase className="text-green-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--text-secondary)" }}>Experiencia</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>+1 Año (Indep.)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl shadow-sm border transition-all hover:-translate-y-1 hover:shadow-md cursor-default" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
              <div className="p-2.5 bg-purple-100/50 dark:bg-purple-500/20 rounded-lg">
                <GraduationCap className="text-purple-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "var(--text-secondary)" }}>Estudios</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>Tec. Universitaria</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl shadow-sm border transition-all hover:-translate-y-1 hover:shadow-md cursor-default" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
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