import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControlls } from "#components";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resumen = () => {
  return (
    <>
      <div id="window-header">
        <WindowControlls target="resume" />
        <h3 className="flex-1 text-center">Alfredo Aguero Ortiz Resume.pdf</h3>
        <a href="/files/Alfredo.Aguero.Resume.pdf" download className="download-icon" title="Download Resume">
          <Download size={18} />
        </a>
      </div>
      <div className="resume-pdf-viewer">
        <Document file="/files/Alfredo.Aguero.Resume.pdf">
          <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
        </Document>
      </div>
    </>
  );
};

const ResumenWindow = WindowWrapper(Resumen, "resume");

export default ResumenWindow;