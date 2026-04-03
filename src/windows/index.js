import Terminal from "#windows/Terminal.jsx";
import Safari from "#windows/Safari.jsx";
import Resumen from "#windows/Resumen.jsx";
import About from "#windows/About.jsx";
import FinderComponent from "#windows/Finder.jsx"; 
import Archive from "#windows/Archive.jsx";
import Text from "#windows/Text.jsx";
import Image from "#windows/Image.jsx";
import Contact from "#windows/Contact.jsx";
import WindowWrapper from "#hoc/WindowWrapper";

const Finder = WindowWrapper(FinderComponent, "finder");

export { Terminal, Safari, Resumen, Finder, About, Archive, Text, Image, Contact };