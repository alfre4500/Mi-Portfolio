import { WindowControlls } from "#components";
import { certificates } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { Copy, PanelLeft, Plus, ChevronLeft, ChevronRight, ShieldHalf, Search, Share, MoveRight } from "lucide-react";

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControlls target="safari" />
        <PanelLeft className="ml-10 icon" />
        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>
        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />
          <div className="search">
            <Search className="icon" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-5" >
            <Share className="icon" />
             <Plus className="icon" />
              <Copy className="icon" />
          </div>
        </div>
      </div>
      <div className="blog">
        <h2 className="flex flex-center">Certificados</h2>
        <p className="text-center text-sm text-gray-500 mb-8">Mi formación más reciente y certificaciones oficiales</p>

        <div className="certificates-grid">
          {certificates.map(({ id, image, title, issuer, date, description, link }) => (
            <article key={id} className="certificate-card group">
              <img
                src={image}
                alt={title}
                className="certificate-thumb"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/images/blog1.png";
                }}
              />
              <div className="certificate-meta">
                <h3>{title}</h3>
                <p className="issuer">{issuer}</p>
                <p className="date">{date}</p>
                <p className="description">{description}</p>
                <a href={link} target="_blank" rel="noopener noreferrer" className="certificate-link">
                  Ver certificado <MoveRight className="icon-hover" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </>
  );
};
const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
