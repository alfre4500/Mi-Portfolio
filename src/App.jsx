import { useEffect } from "react";
import { useThemeStore } from "#store/theme.js";
import gsap from "gsap";
import { Draggable }  from "gsap/Draggable";
import { Navbar, Welcome, Dock } from "#components";
import { Terminal, Safari, Resumen, Finder, Text, Image, Contact , Photos } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  console.log('🔁 App render start');
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <main>
      <video
        id="bg-video"
        className="bg-video"
        src="/images/FONDO.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      
      <Navbar /> 
      <Welcome />

 
      <Terminal />
      <Safari />
      <Resumen />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos/>


      <Dock />
    </main>
  );
};

export default App;