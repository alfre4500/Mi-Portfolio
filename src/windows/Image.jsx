import { WindowControlls } from "../components"; // Ruta relativa
import useWindowStore from "../store/window.js"; // Ruta relativa
import WindowWrapper from "../hoc/WindowWrapper"; // Ruta relativa

const ImageWindowContent  = () =>{
    const { windows } = useWindowStore();
    
    // CORRECCIÓN CLAVE: Usamos 'imgfile' para coincidir con tu configuración
    const data = windows.imgfile?.data;

    // Si no hay datos (o la ventana está cerrada/limpiándose), no renderizamos nada visual
    if(!data) return null;

    // Extraemos imageUrl (o image si usaste ese nombre en el finder)
    const { name, imageUrl } = data;

    return (
        <div className="flex flex-col h-full w-full bg-white font-sans">
            {/* Header: Agregamos flex y justify-between para que se vea ordenado */}
            <div id="window-header" className="flex items-center justify-between px-3 py-2 bg-[#f3f4f6] border-b border-gray-300">
                <WindowControlls target="imgfile" />
                <span className="text-sm font-semibold text-gray-700 truncate px-2">{name}</span>
                {/* Espaciador vacío para equilibrar el header */}
                <div className="w-14"></div> 
            </div>

            {/* Body: Centramos la imagen */}
            <div className="flex-1 flex items-center justify-center p-4 bg-gray-100/50 overflow-hidden" >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        // Ajuste para que la imagen se vea entera sin deformarse
                        className="max-w-full max-h-full object-contain rounded shadow-lg"
                    />
                ) : (
                    <p className="text-gray-400">Imagen no encontrada</p>
                )} 
            </div>
        </div>
    );
};

// Asegúrate que la clave "imgfile" exista en tu WINDOW_CONFIG en constants/index.js
const ImageWindow = WindowWrapper(ImageWindowContent , "imgfile");

export default ImageWindow;