import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControlls.jsx";


const Contact = () => {
    return (
<>
<div id="window-header">
    <WindowControls target="contact"/>
<h2>Contacto</h2>
</div>
<div className="p-5 space-y-5">
    <img src="/images/adrian.jpg" className="w-20  rounded-full" />
    <h3 className="text-left">Quieres saber mas de mi</h3>
    <p>aca dejo mis redes donde puedes encontrarme</p>
    <p className="font-bold">alfreagor@gmail.com</p>
    <ul>
        {socials.map(({id , bg , link , icon ,text }) =>(
            <li key={id} style={{backgroundColor: bg}} >
                <a href={link} target="_blank" rel="noopener noreferrer" title={text}>
                    <img src={icon} alt={text} className="size-5" />
                    <p>{text} </p>
                </a>
            </li>
        ))}
    </ul>
</div>

</>
    );
};
const ContacWindow = WindowWrapper(Contact , "contact");

export default ContacWindow;