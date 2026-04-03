import { WindowControlls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window.js";
import { useLanguageStore } from "#store/language.js";
import { locations } from "#constants/index.js";
import { ArrowRight } from "lucide-react";

const Archive = () => {
  const language = useLanguageStore((state) => state.language);
  const { openWindow } = useWindowStore();

  const items = [
    {
      id: "doc-cv",
      title: language === "es" ? "Currículum" : "Resume",
      description:
        language === "es"
          ? "Descarga mi CV en PDF, listo para compartir con reclutadores."
          : "Download my resume in PDF, ready to share with recruiters.",
      icon: "/images/pdf.png",
      onClick: () => openWindow("resume"),
    },
    {
      id: "doc-certificates",
      title: language === "es" ? "Certificados" : "Certificates",
      description:
        language === "es"
          ? "Accede a mis certificaciones y cursos completados en línea."
          : "Access my certifications and completed online courses.",
      icon: "/images/safari.png",
      onClick: () => openWindow("safari"),
    },
    {
      id: "doc-projects",
      title: language === "es" ? "Proyectos" : "Projects",
      description:
        language === "es"
          ? "Ve una selección de mis trabajos destacados y demos interactivas."
          : "See a selection of my featured projects and interactive demos.",
      icon: "/images/folder.png",
      onClick: () => openWindow("finder", { ...locations.work, isSpecialView: false }),
    },
    {
      id: "doc-contact",
      title: language === "es" ? "Contacto" : "Contact",
      description:
        language === "es"
          ? "Abre el formulario de contacto para enviarme un mensaje rápido."
          : "Open the contact form to send me a quick message.",
      icon: "/images/contact.png",
      onClick: () => openWindow("contact"),
    },
  ];

  return (
    <>
      <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-[#f3f4f6] border-b border-gray-200 draggable-area">
        <WindowControlls target="trash" />
        <h3 className="flex-1 text-center text-sm font-medium text-gray-700">
          {language === "es" ? "Mis Documentos" : "My Documents"}
        </h3>
        <div className="w-10" />
      </div>

      <div className="p-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <img src={item.icon} alt={item.title} className="h-10 w-10 rounded-xl bg-[#f8fafc] p-2 object-contain" />
                <div>
                  <p className="text-base font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 transition group-hover:text-blue-500" />
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-blue-600">
              {language === "es" ? "Abrir" : "Open"}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

const ArchiveWindow = WindowWrapper(Archive, "trash");

export default ArchiveWindow;
