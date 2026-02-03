import dayjs from "dayjs";
import { useLanguageStore } from "#store/language.js";
import { useThemeStore } from "#store/theme.js";
import { getTranslation } from "#constants/translations.js";

const Navbar = () => {
  const language = useLanguageStore((state) => state.language);
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const navLinks = getTranslation(language, "navLinks");

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Alfredo Portfolio</p>
        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <button
              onClick={toggleLanguage}
              className="language-btn"
              title={language === 'es' ? 'Change to English' : 'Cambiar a Español'}
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>
          </li>
          <li>
            <img src="/icons/wifi.svg" className="icon-hover" alt="wifi" />
          </li>
          <li>
            <img src="/icons/search.svg" className="icon-hover" alt="search" />
          </li>
          <li>
            <img src="/icons/user.svg" className="icon-hover" alt="user" />
          </li>
          <li>
            <img src="/icons/mode.svg" className="icon-hover cursor-pointer" alt="mode" onClick={toggleTheme} title={theme === 'dark' ? 'Light mode' : 'Dark mode'} />
          </li>
        </ul>
        <time>{dayjs().format("DD/MM/YYYY h:mm ")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
