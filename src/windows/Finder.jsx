import { useEffect, useState } from "react";
// Importación sin llaves (Default Export) - CORRECTO
import WindowControlls from "#components/WindowControlls.jsx"; 
import { locations } from "#constants";
import { Search } from "lucide-react";
import clsx from "clsx";
import useWindowStore from "#store/window.js";

const Finder = ({ id }) => {
  const { openWindow, windows } = useWindowStore();
  const [activeLocation, setActiveLocation] = useState(null);

  const windowId = id || "finder";
  const finderWindow = windows[windowId];

  // CORRECCIÓN CLAVE:
  // Este efecto solo se ejecutará cuando la ventana cambie de estado (abrir/cerrar).
  // Al abrirse (isOpen: true), forzamos que muestre la carpeta inicial (data).
  // Al navegar dentro, 'isOpen' no cambia, así que no se resetea.
  useEffect(() => {
    if (finderWindow?.isOpen && finderWindow?.data) {
      setActiveLocation(finderWindow.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finderWindow?.isOpen]); 

  const isSpecialView = activeLocation?.isSpecialView === true;

  const openItem = (item) => {
    if(item.fileType === "pdf") return openWindow("resume");
    if(item.kind === "folder") return setActiveLocation(item);
    if (["fig" , "url"].includes(item.fileType) && item.href) return window.open(item.href, "_blank");
    openWindow(`${item.fileType}${item.kind}`, item);
  };
  
  const renderList = (name , items) => {
    if (!items) return null;
    const itemsArray = Array.isArray(items) ? items : Object.values(items);

    return (
      <div className="mb-4">
        <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{name}</h3>
        <ul className="px-2 space-y-1">
          {itemsArray.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveLocation(item)}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all duration-200",
                item.id === activeLocation?.id 
                  ? "bg-blue-100 text-blue-700 font-medium" 
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              )}
            >
              {item.icon && <img src={item.icon} className="w-4 h-4 object-contain" alt={item.name} />}
              <span className="text-sm truncate">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg overflow-hidden font-sans shadow-xl">
      <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-[#f3f4f6] border-b border-gray-200 draggable-area">
        <WindowControlls target={windowId} />
        <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1.5 shadow-sm w-56">
             <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
             <span className="text-xs text-gray-400">Buscar</span>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {!isSpecialView && (
          <div className="w-52 bg-[#fbfbfd]/95 backdrop-blur-sm border-r border-gray-200 overflow-y-auto py-4 shrink-0">
               {renderList("Favoritos", locations)}
               {locations.work && locations.work.children && renderList("Trabajo", locations.work.children)}
          </div>
        )}

        <div className="flex-1 bg-white overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">
                {activeLocation?.name || "Carpetas"}
            </h2>

            <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 auto-rows-min">
              {activeLocation?.children && activeLocation.children.length > 0 ? (
                 activeLocation.children.map((item) => (
                  <li 
                    key={item.id} 
                    onClick={() => openItem(item)} 
                    className="group flex flex-col items-center p-3 rounded-xl hover:bg-blue-50 cursor-pointer transition-all duration-200"
                  >
                    <div className="w-16 h-16 flex items-center justify-center mb-3 transition-transform group-hover:scale-105">
                        <img 
                          src={item.icon} 
                          alt={item.name} 
                          className="w-full h-full object-contain drop-shadow-sm"
                        />
                    </div>
                    <p className="text-xs text-center text-gray-600 font-medium leading-snug line-clamp-2 w-full wrap-break-words group-hover:text-blue-600 px-1">
                      {item.name} 
                    </p>
                  </li>
                ))
              ) : (
                 <div className="col-span-full h-64 flex flex-col items-center justify-center text-gray-400">
                    <div className="w-16 h-16 mb-4 opacity-20 bg-gray-300 rounded-full"></div>
                    <p>Esta carpeta está vacía</p>
                 </div>
              )}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Finder;