import { useState, useEffect, useRef } from "react"; // IMPORTANTE: Agregamos hooks
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants";
import { Check, Flag, ChevronRight, Terminal as TerminalIcon } from "lucide-react";
import WindowControlls from "#components/WindowControlls.jsx";

const Terminal = () => {
  // --- ESTADOS PARA LA ANIMACIÓN ---
  // Controlan qué partes de la interfaz son visibles en cada momento
  const [showCommand, setShowCommand] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(0); // Cuántas filas mostrar
  const [showFooter, setShowFooter] = useState(false);

  // Referencia para controlar los timeouts y evitar errores si se cierra la ventana rápido
  const timeoutsRef = useRef([]);

  // Función auxiliar para añadir timeouts de forma segura
  const addTimeout = (callback, delay) => {
    const id = setTimeout(callback, delay);
    timeoutsRef.current.push(id);
  };

  // --- LÓGICA DE LA SECUENCIA DE ANIMACIÓN ---
  useEffect(() => {
    // 1. Paso inicial: Esperamos un poco y mostramos el comando
    addTimeout(() => {
      setShowCommand(true);

      // 2. Paso intermedio: Bucle para mostrar las categorías una por una
      techStack.forEach((_, index) => {
        // Calculamos el retraso: cuanto más abajo en la lista, más tarda
        const delay = (index + 1) * 300; // 300ms entre cada fila
        
        addTimeout(() => {
          setVisibleItemsCount(prev => prev + 1);
          
          // Si es el último elemento, programamos la aparición del footer
          if (index === techStack.length - 1) {
             addTimeout(() => setShowFooter(true), 500);
          }
        }, delay);
      });

    }, 600); // Retraso inicial antes de empezar a "escribir"

    // CLEANUP: Si la ventana se cierra antes de terminar la animación,
    // cancelamos todos los timeouts pendientes para evitar errores de memoria.
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-[#0c0c0c]/95 backdrop-blur-md font-mono text-sm text-[#d1d1d1] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 rounded-lg">
      {/* Header */}
      <div id="window-header" className="flex items-center gap-4 px-4 py-2 bg-[#1a1a1a] border-b border-white/5 draggable-area select-none">
        <WindowControlls target="terminal" />
        <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
           <TerminalIcon size={13} strokeWidth={2.5} />
           <span>alfredo — zsh — 80×24</span>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {/* 1. Comando de Entrada (Renderizado Condicional) */}
        {showCommand && (
          <div className="mb-6 animate-in fade-in duration-300">
            <p className="flex items-center flex-wrap gap-x-2 gap-y-1 leading-relaxed">
              <span className="text-[#5af78e] font-bold">@Alfredo</span>
              <span className="text-[#f3f99d] font-bold">%</span>
              <span className="text-white typing-effect">mostrar las habilidades</span>
              {/* El cursor solo parpadea si aún no ha aparecido el footer */}
              {!showFooter && <span className="w-2.5 h-5 bg-[#5af78e] animate-pulse shadow-[0_0_8px_#5af78e]"></span>}
            </p>
          </div>
        )}

        {/* Tabla de Habilidades */}
        <div className={`border border-white/10 rounded-lg overflow-hidden bg-white/3 transition-opacity duration-500 ${visibleItemsCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-[180px_1fr] bg-white/5 px-5 py-3 border-b border-white/10 text-[#57c7ff] font-bold uppercase tracking-wider text-[10px] select-none">
             <span>Categoría</span>
             <span>Tecnologías Detectadas</span>
          </div>

          <ul className="divide-y divide-white/5">
            {/* 2. Filtramos la lista para mostrar solo los ítems visibles según el estado */}
            {techStack.slice(0, visibleItemsCount).map(({ category, items }) => (
              <li key={category} className="grid grid-cols-[180px_1fr] items-start px-5 py-4 hover:bg-white/4 transition-all animate-in slide-in-from-left-2 duration-300">
                <div className="flex items-center gap-2 text-[#5af78e]">
                  <ChevronRight size={16} className="opacity-70" strokeWidth={2.5} />
                  <h3 className="font-bold text-sm tracking-wide">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2 pl-2">
                  {items.map((item, i) => (
                    <span key={i} className="text-gray-300 bg-white/10 px-2 py-0.5 rounded text-[11px] border border-white/5">
                      {item}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Footer de la Terminal (Renderizado Condicional) */}
        {showFooter && (
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col gap-1.5 text-[11px] text-gray-500 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="flex items-center gap-2">
              <Check size={14} className="text-[#5af78e]" strokeWidth={3} />
              <span className="text-gray-400 font-medium">{techStack.length} de {techStack.length} módulos cargados exitosamente.</span>
              <span className="text-[#5af78e] font-bold">[OK]</span>
            </p>
            <p className="flex items-center gap-2">
              <Flag size={12} className="text-[#ff5c57]" strokeWidth={2.5} />
              <span>Tiempo total de ejecución: {(techStack.length * 300 + 800) / 1000}s</span>
            </p>
            <p className="mt-3 text-[#57c7ff] opacity-60">
              <span className="text-[#5af78e] mr-2">➜</span>
              Last login: {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} on ttys001
            </p>
             {/* Nuevo prompt al final para indicar que está listo */}
             <p className="mt-4 flex items-center gap-2">
              <span className="text-[#5af78e] font-bold">@Alfredo</span>
              <span className="text-[#f3f99d] font-bold">%</span>
              <span className="w-2.5 h-5 bg-[#5af78e] animate-pulse shadow-[0_0_8px_#5af78e]"></span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;