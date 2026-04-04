import { useEffect, useRef } from "react";
import { useLanguageStore } from "#store/language.js";
import { getTranslation } from "#constants/translations.js";
import { locations, certificates, techStack, socials } from "#constants";
import { ExternalLink, Github, Linkedin, Code } from "lucide-react";
import gsap from "gsap";

const MobileView = () => {
  const language = useLanguageStore((state) => state.language);
  const containerRef = useRef(null);

  const aboutData = locations.about.children;
  const profileImage = aboutData.find((item) => item.fileType === "img")?.imageUrl || "/images/yop.jpg";
  const description = aboutData.find((item) => item.fileType === "txt")?.description?.[0] || "¡Hola! Soy un desarrollador Frontend...";

  const projects = locations.work.children || [];

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll('.mobile-section');
    if (!sections) return;

    gsap.from(sections, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
      delay: 0.2,
    });
  }, []);

  return (
    <main className="relative min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth text-white bg-transparent">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/FONDO.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="fixed top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-xl border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3 text-sm text-white">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-base"></span>
          <span className="font-semibold">Alfredo Portfolio</span>
        </div>
      </div>

      <div ref={containerRef} className="relative z-10 pb-24 pt-20">
        {/* About Section */}
        <section id="about" className="mobile-section py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              {getTranslation(language, "aboutTitle")}
            </h2>
            <div className="flex flex-col gap-8 items-center">
              <div className="w-full flex flex-col items-center">
                <div className="rounded-3xl bg-black/40 border border-white/10 p-6 shadow-2xl shadow-black/20 w-full md:w-auto">
                  <img
                    src={profileImage}
                    alt="Alfredo"
                    className="mx-auto w-32 h-32 rounded-full object-cover shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-white text-center">Alfredo</h3>
                  <p className="text-blue-200 text-center">Frontend Developer</p>
                </div>
              </div>
              <div className="w-full">
                <div className="rounded-3xl bg-black/40 border border-white/10 p-6 shadow-2xl shadow-black/20">
                  <p className="text-white/90 leading-8">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Habilidades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techStack.map((category) => (
                <div key={category.category} className="rounded-3xl bg-black/40 border border-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="text-blue-200" size={24} />
                    <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-white/10 text-white/90 rounded-full text-sm font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Proyectos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="rounded-3xl bg-black/40 border border-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                  <h3 className="text-xl font-semibold mb-2 text-white">{project.name}</h3>
                  <p className="text-white/80 mb-4 leading-7">
                    {project.children?.find(child => child.fileType === 'txt')?.description?.[0] || 'Descripción del proyecto...'}
                  </p>
                  {project.children?.find(child => child.fileType === 'link') && (
                    <a
                      href={project.children.find(child => child.fileType === 'link').url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-200 hover:text-white"
                    >
                      Ver proyecto <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Certificados
            </h2>
            <div className="space-y-8">
              {certificates.map((cert) => (
                <article key={cert.id} className="rounded-3xl bg-black/40 border border-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img src={cert.image} alt={cert.title} className="w-full md:w-32 h-32 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-white">{cert.title}</h3>
                      <p className="text-blue-200 mb-2">{cert.issuer} - {cert.date}</p>
                      <p className="text-white/80 mb-4 leading-7">{cert.description}</p>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-200 hover:text-white"
                      >
                        Ver certificado <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mobile-section py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-white">
              Contacto
            </h2>
            <div className="rounded-3xl bg-black/40 border border-white/10 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
              <p className="text-white/80 mb-6">¡Hablemos!</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
                  >
                    {social.text === 'Github' && <Github size={20} />}
                    {social.text === 'LinkedIn' && <Linkedin size={20} />}
                    {social.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MobileView;