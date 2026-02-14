
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControlls } from "#components"; 

const Photos = () => {
    return (
        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">       

            Photos Window

        </div>
    );
}
const PhotosWindow = WindowWrapper(Photos , "photos");
export default PhotosWindow;