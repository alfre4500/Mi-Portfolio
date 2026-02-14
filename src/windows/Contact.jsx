import { useState } from "react";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControlls } from "#components"; 
import { Mail, Copy, Check, ExternalLink } from "lucide-react";

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "alfreagor@gmail.com";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full h-full bg-white/80 backdrop-blur-md flex flex-col font-sans overflow-hidden">
            {/* Header Estilo macOS */}
            <div id="window-header" className="flex items-center gap-4 px-4 py-3 bg-[#f3f4f6]/50 border-b border-gray-200 draggable-area">
                <WindowControlls target="contact"/>
                <h2 className="text-sm font-semibold text-gray-600">Información de Contacto</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                
                {/* Sección de Perfil / Tarjeta de Presentación */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <img 
                            src="/images/alfre2.jpg" 
                            className="relative w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover" 
                            alt="Alfredo" 
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Alfredo Agüero Ortiz</h1>
                        <p className="text-blue-600 font-medium text-sm">Front-end Developer</p>
                    </div>
                </div>

                {/* Acciones Rápidas de Email */}
                <div className="grid grid-cols-2 gap-3">
                    <a 
                        href={`mailto:${email}`}
                        className="flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                    >
                        <Mail size={18} />
                        <span className="text-sm font-bold">Escribir</span>
                    </a>
                    <button 
                        onClick={copyToClipboard}
                        className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                    >
                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        <span className="text-sm font-bold">{copied ? "¡Copiado!" : "Copiar"}</span>
                    </button>
                </div>

                {/* Grid de Redes Sociales */}
                <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 px-1">Conecta conmigo</p>
                    <div className="grid grid-cols-2 gap-3">
                        {socials.map(({id, bg, link, icon, text}) => (
                            <a 
                                key={id} 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <div 
                                        style={{ backgroundColor: bg }} 
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner transition-transform group-hover:rotate-6"
                                    >
                                        <img src={icon} className="w-5 h-5 brightness-0 invert" alt={text} />
                                    </div>
                                    <span className="font-bold text-gray-700 text-sm">{text}</span>
                                </div>
                                <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>

            
            </div>
        </div>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;