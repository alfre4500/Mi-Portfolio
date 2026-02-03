import { useEffect } from "react";
import { useThemeStore } from "#store/theme.js";
import gsap from "gsap";
import { Draggable }  from "gsap/Draggable";
import { Navbar , Welcome  , Dock} from "#components";
import  {Terminal}  from "#windows";

gsap.registerPlugin(Draggable);
const App = ()=>{
  console.log('🔁 App render start');
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <main>
      <Navbar /> 
      <Welcome/>
      <Dock/>

      <Terminal/>
    </main>
  );
};
export default App;