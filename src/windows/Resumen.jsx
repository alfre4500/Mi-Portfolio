import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControlls } from "#components";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';

// 1. IMPORTAMOS LO NECESARIO PARA EL IDIOMA
import { useLanguageStore } from "#store/language.js";
import { getTranslation } from "#constants/translations.js";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resumen = () => {
  // 2. OBTENEMOS EL IDIOMA Y LAS TRADUCCIONES DINÁMICAS
  const language = useLanguageStore((state) => state.language);
  const resumeUrl = getTranslation(language, "resumeUrl");
  const resumeTitle = getTranslation(language, "resumeTitle");

  return (
    <>
      <div id="window-header">
        <WindowControlls target="resume" />
        {/* 3. TÍTULO DINÁMICO SEGÚN EL IDIOMA */}
        <h3 className="flex-1 text-center font-medium text-gray-700">
          {resumeTitle}
        </h3>
        
        {/* 4. LINK DE DESCARGA DINÁMICO */}
        <a 
          href={resumeUrl} 
          download 
          className="download-icon p-2 hover:bg-gray-200 rounded-full transition-colors" 
          title={language === 'es' ? "Descargar CV" : "Download Resume"}
        >
          <Download size={18} />
        </a>
      </div>

      <div className="resume-pdf-viewer overflow-auto bg-gray-50 flex justify-center py-4">
        {/* 5. EL ARCHIVO PDF CAMBIA AUTOMÁTICAMENTE */}
        <Document 
          file={resumeUrl}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
        >
          <Page 
            pageNumber={1} 
            renderTextLayer 
            renderAnnotationLayer 
            // Ajuste opcional: escala automática o fija
            scale={1.2} 
          />
        </Document>
      </div>
    </>
  );
};

const ResumenWindow = WindowWrapper(Resumen, "resume");

export default ResumenWindow;