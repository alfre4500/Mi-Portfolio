import { useEffect, useRef } from "react";
import { useLanguageStore } from "#store/language.js";
import { locations, certificates, techStack, socials } from "#constants";
import { ExternalLink, Github, Linkedin, Code, MapPin, Briefcase, Mail, GraduationCap, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registramos el plugin
gsap.registerPlugin(ScrollTrigger);

const MobileView = () => {
  const language = useLanguageStore((state) => state.language);
  const containerRef = useRef(null);

  const aboutData = locations.about.children;
  const profileImage = aboutData.find((item) => item.fileType === "img")?.imageUrl || "/images/yop.jpg";
  const description = aboutData.find((item) => item.fileType === "txt")?.description?.[0] || "¡Hola! Soy un desarrollador Frontend...";

  const projects = locations.work.children || [];

  const getTechTopics = (desc) => {
    const knownTech = ["React", "Next.js", "GSAP", "Zustand", "Stripe", "Tailwind", "Three.js", "3D", "Frontend"];
    return knownTech.filter(tech => desc.toLowerCase().includes(tech.toLowerCase()));
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación de entrada para el Header
      gsap.from(".mobile-header", { 
        y: -50, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power4.out" 
      });

      // 2. Animación inmediata para la primera sección (Hero/About)
      gsap.from(".hero-content", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3
      });

      // 3. Revelación por Scroll para el resto de secciones
      // IMPORTANTE: Definimos 'scroller' para que GSAP escuche el scroll del DIV interno
      const revealSections = gsap.utils.toArray(".reveal-section");
      revealSections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            scroller: containerRef.current, // Indica a GSAP que el scroll ocurre aquí
            start: "top 90%",
            toggleActions: "play none none none"
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-y-auto overflow-x-hidden scroll-smooth text-white bg-transparent"
    >
      {/* Fondo fijo */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/FONDO.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Header Fijo con Logo de Manzana */}
      <div className="mobile-header fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div 
          onClick={scrollToTop}
          className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-white/10 transition-colors"
        >
          {/* Logo oficial de Apple */}
          <img 
            src="/images/logo.svg" 
            alt="logo" 
            className="h-5 w-5 object-contain invert brightness-200" 
          />
          <span className="font-semibold text-sm tracking-wide">Alfredo Portfolio</span>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 pb-24 pt-24 px-4 max-w-4xl mx-auto flex flex-col gap-20">
        
        {/* SECCIÓN SOBRE MÍ (Se anima al cargar) */}
        <section id="mobile-about" className="hero-content scroll-mt-32">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <img
                src={profileImage}
                alt="Alfredo"
                className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-white/20"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-black/80 rounded-full shadow-lg"></div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Alfredo</h1>
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-6">Frontend Developer</h2>
            
            <div className="w-full rounded-3xl bg-black/40 border border-white/10 p-6 shadow-2xl backdrop-blur-xl mb-8">
              <p className="text-white/90 leading-relaxed text-pretty">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              {[
                { icon: MapPin, label: "Ubicación", val: "San Juan, ARG", color: "blue" },
                { icon: Briefcase, label: "Experiencia", val: "+1 Año", color: "green" },
                { icon: GraduationCap, label: "Estudios", val: "Tec. Univ.", color: "purple" },
                { icon: Mail, label: "Estado", val: "Disponible", color: "red" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-lg">
                  <div className={`p-2.5 bg-${item.color}-500/20 rounded-xl`}>
                    <item.icon className={`text-${item.color}-400 w-6 h-6`} />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">{item.label}</p>
                  <p className="text-sm font-bold mt-0.5 text-white">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN HABILIDADES (A partir de aquí se revelan con scroll) */}
        <section id="mobile-skills" className="reveal-section scroll-mt-32">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">Habilidades</h2>
          <div className="grid grid-cols-1 gap-4">
            {techStack.map((category) => (
              <div key={category.category} className="rounded-3xl bg-black/40 border border-white/10 p-5 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-2">
                  <Code className="text-blue-400" size={18} />
                  <h3 className="text-base font-semibold text-white">{category.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 bg-white/10 text-white/80 rounded-md text-xs border border-white/5">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN PROYECTOS */}
        <section id="mobile-projects" className="reveal-section scroll-mt-32">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">Proyectos</h2>
          <div className="grid grid-cols-1 gap-8">
            {projects.map((project) => {
              const projDesc = project.children?.find(child => child.fileType === 'txt')?.description?.[0] || 'Sin descripción...';
              const links = project.children?.filter(child => child.fileType === 'url') || [];
              const techTopics = getTechTopics(projDesc);

              return (
                <div key={project.id} className="rounded-3xl bg-black/40 border border-white/10 p-6 shadow-xl backdrop-blur-xl">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.name.replace(/-/g, ' ')}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{projDesc}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {techTopics.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {links.map((link) => {
                      const isRepo = link.name.toLowerCase().includes('repo');
                      return (
                        <a
                          key={link.id}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                            isRepo 
                            ? "bg-white/10 text-white border border-white/10" 
                            : "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                          }`}
                        >
                          {isRepo ? <Github size={16} /> : <Globe size={16} />}
                          {link.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SECCIÓN CERTIFICADOS */}
        <section id="mobile-certificates" className="reveal-section scroll-mt-32">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">Certificados</h2>
          <div className="grid grid-cols-1 gap-6">
            {certificates.map((cert) => (
              <article key={cert.id} className="rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-xl backdrop-blur-xl flex flex-col">
                <img src={cert.image} alt={cert.title} className="w-full h-40 object-cover opacity-90" />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1 text-white leading-tight">{cert.title}</h3>
                  <p className="text-blue-400 text-xs font-semibold mb-3 tracking-wide">{cert.issuer} • {cert.date}</p>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-300 font-medium active:scale-95"
                  >
                    Ver credencial <ExternalLink size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECCIÓN CONTACTO */}
        <section id="mobile-contact" className="reveal-section scroll-mt-32">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">Contacto</h2>
          <div className="rounded-3xl bg-black/40 border border-white/10 p-8 shadow-xl backdrop-blur-xl text-center">
            <p className="text-white/80 mb-8 leading-relaxed">¿Tienes algún proyecto en mente o buscas un desarrollador? ¡Hablemos!</p>
            <div className="flex flex-col gap-4">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-4 py-4 bg-white/5 rounded-2xl border border-white/5 text-white font-medium active:scale-95"
                >
                  {social.text === 'Github' ? <Github size={20} /> : <Linkedin size={20} />}
                  {social.text}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default MobileView;