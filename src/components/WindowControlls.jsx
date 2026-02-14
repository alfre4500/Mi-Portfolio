import useWindowStore from "#store/window";
import React from "react";


export const WindowControlls = ({ target }) => {
    const { closeWindow } = useWindowStore();

    return (
        
        <div className="flex gap-2 group items-center">
            
     
            <div 
                className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] cursor-pointer flex items-center justify-center hover:brightness-90 active:scale-90 transition-transform" 
                onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(target);
                }}
            >
             
                <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/50 leading-none pt-px">×</span>
            </div>

            <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#dba037] flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/50 leading-none pt-px">-</span>
            </div>

      
            <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-[6px] font-bold text-black/50 leading-none pt-px">↗</span>
            </div>

        </div>  
    );
};
export default WindowControlls; 