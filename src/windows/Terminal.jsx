import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants";
import { Check, Flag } from "lucide-react";
import WindowControlls from "#components/WindowControlls.jsx";


const Terminal = ()=>{
return (
<>
<div id="window-header">
<WindowControlls  target="terminal"/>
<h2>Stack tecnologico</h2>
</div>
<div className="techstack">
   <p>
      <span className="font-bold">@Alfredo % </span>
      mostrar las habilidades
   </p>
   <div className="label">
      <p className="w-32">Categoria</p>
      <p>Tecnologias</p>
   </div>
   <ul className="content">
   {techStack.map(({ category, items }) => (
      <li key={category}  className="flex items-center">
<Check className="check" size={20} />
<h3>{category}</h3>
<ul>
   {items.map((item , i) => (
<li key={i} >
   {item}
</li>
   ))}
</ul>
      </li>
   ))}      
   </ul>
   <div className="footnote">
      <p>
         <Check className="check" size={20}/> 5 de 5 habilidades cargadas exitosamente. (100%)
      </p>
      <p className="text-black">
         <Flag size={15} fill="black"/>
         tiempo de renderizado : 6ms
      </p>
   </div>
</div>
</>
);
};
const TerminalWindow =  WindowWrapper(Terminal, "terminal");

export default TerminalWindow;