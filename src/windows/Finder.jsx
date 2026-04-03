import { useEffect, useState } from "react";
// Importación sin llaves (Default Export) - CORRECTO
import WindowControlls from "#components/WindowControlls.jsx"; 
import { locations, INITIAL_Z_INDEX } from "#constants";
import { Search } from "lucide-react";
import clsx from "clsx";
import useWindowStore from "#store/window.js";
import { useLanguageStore } from "#store/language.js";

const UI_TEXT = {
  es: {
    back: "← Atrás",
    rootName: "Carpetas",
    favorites: "Favoritos",
    search: "Buscar",
    empty: "Esta carpeta está vacía",
  },
  en: {
    back: "← Back",
    rootName: "Folders",
    favorites: "Favorites",
    search: "Search",
    empty: "This folder is empty",
  },
};

const Finder = ({ id }) => {
  const { openWindow, windows } = useWindowStore();
  const language = useLanguageStore((state) => state.language);
  const [activeLocation, setActiveLocation] = useState(null);
  const [pathStack, setPathStack] = useState([]);

  const text = UI_TEXT[language] ?? UI_TEXT.es;

  const windowId = id || "finder";
  const finderWindow = windows[windowId];

  const findPath = (nodes, targetId, accumulator = []) => {
    if (!nodes) return null;
    const arrayNodes = Array.isArray(nodes) ? nodes : Object.values(nodes);

    for (const node of arrayNodes) {
      if (!node) continue;
      const newPath = [...accumulator, node];
      if (node.id === targetId) {
        return newPath;
      }
      if (node.children) {
        const found = findPath(node.children, targetId, newPath);
        if (found) return found;
      }
    }
    return null;
  };

  const getPathForLocation = (location) => {
    if (!location) return [];
    const path = findPath(locations, location.id);
    return path || [location];
  };

  const canGoBack = pathStack.length > 1;

  const goBack = () => {
    if (!canGoBack) return;
    const nextPath = pathStack.slice(0, -1);
    setPathStack(nextPath);
    setActiveLocation(nextPath[nextPath.length - 1]);
  };

  const navigateToPathIndex = (index) => {
    const nextPath = pathStack.slice(0, index + 1);
    setPathStack(nextPath);
    setActiveLocation(nextPath[nextPath.length - 1]);
  };

  const handleSelectLocation = (location) => {
    setActiveLocation(location);
    setPathStack(getPathForLocation(location));
  };

  const getValidLocation = (location) => {
    if (!location || !Array.isArray(location.children) || location.children.length === 0) {
      return locations.work;
    }
    return location;
  };

  // Este efecto se ejecuta cuando la ventana Finder cambia de estado.
  // Si abre con datos válidos, carga esa carpeta. Si no, usa el work location.
  useEffect(() => {
    if (finderWindow?.isOpen) {
      const locationData = getValidLocation(finderWindow.data);
      const safeLocation = getValidLocation(locationData);
      setActiveLocation(safeLocation);
      setPathStack(getPathForLocation(safeLocation));
    } else {
      setActiveLocation(null);
      setPathStack([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finderWindow?.isOpen, finderWindow?.data]);

  const isSpecialView = activeLocation?.isSpecialView === true;

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") {
      setActiveLocation(item);
      setPathStack((prev) => [...prev, item]);
      return;
    }
    if (["fig", "url"].includes(item.fileType) && item.href) return window.open(item.href, "_blank");
    openWindow(`${item.fileType}${item.kind}`, item);
  };
  
  const renderList = (name , items) => {
    if (!items) return null;
    const itemsArray = Array.isArray(items) ? items : Object.values(items);

    // Eliminamos el topic "about" del menú de la izquierda
    const filteredItems = itemsArray.filter((item) => item.type !== "about" && item.id !== "folder-about");

    return (
      <div className="mb-4">
        <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{name}</h3>
        <ul className="px-2 space-y-1">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelectLocation(item)}
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
        <WindowControlls target="finder" />
        <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1.5 shadow-sm w-56">
             <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
             <span className="text-xs text-gray-400">{text.search}</span>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {!isSpecialView && (
          <div className="w-52 bg-[#fbfbfd]/95 backdrop-blur-sm border-r border-gray-200 overflow-y-auto py-4 shrink-0">
               {renderList(text.favorites, locations)}
          </div>
        )}

        <div className="flex-1 bg-white overflow-y-auto p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              {canGoBack ? (
                <button
                  onClick={goBack}
                  className="px-2 py-1 text-xs rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  {text.back}
                </button>
              ) : (
                <div />
              )}

              <div className="text-xs text-gray-500 truncate">
                {pathStack.length > 0
                  ? pathStack.map((node, index) => (
                      <span key={node.id} className="inline-flex items-center">
                        <button
                          onClick={() => navigateToPathIndex(index)}
                          className={clsx(
                            "text-blue-600 hover:underline focus:outline-none",
                            index === pathStack.length - 1 && "text-gray-700 font-semibold hover:no-underline"
                          )}
                          disabled={index === pathStack.length - 1}
                        >
                          {node.name}
                        </button>
                        {index < pathStack.length - 1 && <span className="mx-1">/</span>}
                      </span>
                    ))
                  : text.rootName}
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">
                {activeLocation?.name || text.rootName}
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
                    <p>{text.empty}</p>
                 </div>
              )}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Finder;