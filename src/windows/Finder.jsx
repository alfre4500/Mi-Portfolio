import { WindowControlls } from "#components";
import { locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Search } from "lucide-react";
import  useLocationStore  from "../store/location.js";;
import clsx from "clsx";
import useWindowStore from "#store/window.js";

const Finder = () => {
  
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    if(item.fileType === "pdf") return openWindow("resume");
    if(item.kind === "folder") return setActiveLocation(item);
    if (["fig" , "url"].includes(item.fileType) && item.href) return window.open(item.href, "_blank");
    openWindow (`${item.fileType}${ item.kind}` , item);
  };
  
  const renderList = (name , items) => (
    <div>
      <h3 className="px-4 py-2 text-xs font-semibold text-gray-500">{name}</h3>
      <ul className="px-2">
        {items?.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              "flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors",
              item.id === activeLocation?.id ? "bg-gray-200" : "hover:bg-gray-100"
            )}
          >
            <img src={item.icon} className="w-4 h-4" alt={item.name} />
            <p className="text-sm font-medium truncate text-gray-700">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg overflow-hidden font-sans">
      {/* Header */}
      <div id="window-header" className="flex items-center justify-between px-3 py-2 bg-[#f3f4f6] border-b border-gray-300">
        <WindowControlls target="finder" />
        <div className="flex items-center bg-white border border-gray-300 rounded px-2 py-1 shadow-sm w-48">
             <Search className="w-3 h-3 text-gray-400 mr-2" />
             <span className="text-xs text-gray-400">Buscar</span>
        </div>
      </div>

      <div className="bg-white flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-[#fbfbfd]/90 backdrop-blur border-r border-gray-200 overflow-y-auto py-2 shrink-0">
             {renderList("Favoritos", Object.values(locations))}
             {locations.work && renderList("Trabajo", locations.work.children)}
        </div>

        {/* --- ZONA DE CONTENIDO (GRID ORDENADO) --- */}
        <ul className="flex-1 p-6 grid grid-cols-4 md:grid-cols-5 gap-8 content-start bg-white overflow-y-auto">
          {activeLocation?.children ? (
             activeLocation.children.map((item) => (
              <li 
                key={item.id} 
                onClick={() => openItem(item)} 
              
                className="flex flex-col items-center p-2 w-24 h-32 rounded-xl hover:bg-blue-100 cursor-pointer transition-colors group relative"
              >
                {/* Contenedor del Icono */}
                <div className="w-16 h-16 flex items-center justify-center mb-2">
                    <img 
                      src={item.icon} 
                      alt={item.name} 
                      className="max-w-full max-h-full object-contain drop-shadow-sm"
                    />
                </div>
                {/* Contenedor del Texto */}
                <div className="w-full h-10 flex items-start justify-center">
                    <p className="text-xs text-center text-gray-700 font-medium leading-tight line-clamp-2 -wrap-break-words group-hover:text-blue-700 px-1 rounded-sm">
                      {item.name} 
                    </p>
                </div>
              </li>
            ))
          ) : (
             <div className="col-span-full h-full flex flex-col items-center justify-center text-gray-300">
                <p>Carpeta vacía</p>
             </div>
          )}
        </ul>
      </div>
    </div>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;