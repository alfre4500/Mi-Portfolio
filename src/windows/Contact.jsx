import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControlls } from "#components"; 

const Contact = () => {
    return (
        <div className="w-full h-full bg-white flex flex-col font-sans">
            
            <div id="window-header" className="flex items-center gap-4 px-4 py-2 bg-gray-100 border-b border-gray-300">
                <WindowControlls target="contact"/>
                <h2 className="font-semibold text-gray-700">Contacto</h2>
            </div>

            <div className="p-5 space-y-5 overflow-y-auto">
                <img src="/images/adrian.jpg" className="w-20 rounded-full shadow-sm" alt="Perfil" />
                
                <h3 className="text-left font-bold text-lg">¿Quieres saber más de mí?</h3>
                <p className="text-gray-600">Acá dejo mis redes donde puedes encontrarme:</p>
                
                <p className="font-bold select-all text-blue-600">alfreagor@gmail.com</p>
                
                <ul className="space-y-2">
                    {socials.map(({id , bg , link , icon ,text }) =>(
                        <li key={id} style={{backgroundColor: bg}} className="rounded-md transition-transform hover:scale-[1.02]">
                            <a href={link} target="_blank" rel="noopener noreferrer" title={text} className="flex items-center gap-3 p-2 text-white font-medium">
                                <img 
                                    src={icon} 
                                    alt={text} 
                                   
                                   className={`brightness-0 invert transition-transform ${id === 4 ? "w-6 h-6 -mt-0.3" : "w-5 h-5"}`}
                                />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ContactWindow = WindowWrapper(Contact , "contact");

export default ContactWindow;