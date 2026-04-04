import { useEffect, useState } from "react";
import { useThemeStore } from "#store/theme.js";
import gsap from "gsap";
import { Draggable }  from "gsap/Draggable";
import { Navbar, Welcome, Dock, MobileView } from "#components";
// 1. AGREGAMOS 'About' Y 'Archive' A LA IMPORTACIÓN
import { Terminal, Safari, Resumen, Finder, About, Archive, Text, Image, Contact } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  console.log('🔁 App render start');
  const theme = useThemeStore((state) => state.theme);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (isMobile) {
    return <MobileView />;
  }

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
      <About />
      <Archive />
      <Text />
      <Image />
      <Contact />

      <Dock />
    </main>
  );
};

export default App;