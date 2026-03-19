import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControlls } from "#components";
import { locations } from "#constants";
import useWindowStore from "#store/window.js";
import { useLanguageStore } from "#store/language.js";
import { getTranslation } from "#constants/translations.js";

const About = () => {
  const { windows, openWindow } = useWindowStore();
  const language = useLanguageStore((state) => state.language);
  const aboutLabel = getTranslation(language, "aboutTitle");

  const aboutWindow = windows.about;
  const aboutData = aboutWindow?.data || locations.about;

  const handleOpenItem = (item) => {
    if (!item) return;
    if (item.fileType === "img") openWindow("imgfile", item);
    if (item.fileType === "txt") openWindow("txtfile", item);
  };

  return (
    <>
      <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-[#f3f4f6] border-b border-gray-200">
        <WindowControlls target="about" />
        <h3 className="text-center flex-1 text-sm font-semibold text-gray-700">{aboutLabel}</h3>
        <div className="w-12" />
      </div>

      <div className="p-6 bg-white">
        <h2 className="text-lg font-bold text-gray-800">{aboutData.name}</h2>
        <p className="text-sm text-gray-500 mb-6">Selecciona un archivo para abrir:</p>

        <div className="grid grid-cols-1 gap-4">
          {aboutData.children?.map((item) => (
            <button
              key={item.id}
              type="button"
              className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition"
              onClick={() => handleOpenItem(item)}
            >
              <img src={item.icon} alt={item.name} className="w-10 h-10 rounded" />
              <div className="text-left">
                <p className="font-semibold text-gray-700">{item.name}</p>
                <p className="text-xs text-gray-500">{item.fileType === "img" ? "Imagen" : "Texto"}</p>
              </div>
            </button>
          ))}

          {!aboutData.children?.length && (
            <p className="text-sm text-gray-500">No hay archivos disponibles.</p>
          )}
        </div>
      </div>
    </>
  );
};

const AboutWindow = WindowWrapper(About, "about");

export default AboutWindow;
