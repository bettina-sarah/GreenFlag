/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : ThemeSelector.tsx
Created By  : Vincent Fournier
About       : Ce composant React, ThemeSelector, permet de choisir dynamiquement un
              thème visuel pour une application, en utilisant localStorage pour 
              mémoriser le thème sélectionné et en gérant un menu déroulant qui se 
              ferme automatiquement lorsqu'on clique à l'extérieur.
====================================================================================
------------------------------------------------------------------------------------
*/

import { useState, useEffect, useRef } from "react";
import IconButton from "../IconButton";
import PaletteIcon from "@/../ressources/icons/palette_bold_icon_white.png";

const ThemeSelector = () => {
  const [theme, setTheme] = useState(
    sessionStorage.getItem("theme") || "theme-emerald"
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Change theme dynamically
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    sessionStorage.setItem("theme", newTheme); // Save selected theme in localStorage
    setIsOpen(false);
  };

  useEffect(() => {
    document.documentElement.classList.remove(
      "theme-emerald",
      "theme-autumn",
      "theme-electric",
      "theme-orange",
      "theme-blue",
      "theme-green"
    );
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Gemini
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node | null)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={componentRef} className="relative pt-1">
      <IconButton icon={PaletteIcon} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="flex absolute mt-2 w-32 bg-primary-color before:ounded-md shadow-lg z-10 left-1/2  transform -translate-x-1/2">
          <ul className="w-full space-y-2 p-2">
            <li>
              <button
                className="w-full p-2 bg-theme-emerald/80 text-xl text-white hover:bg-theme-emerald/50 rounded-md"
                onClick={() => changeTheme("theme-emerald")}
              >
                Emerald
              </button>
            </li>
            <li>
              <button
                className="w-full p-2 bg-theme-autumn/80 text-xl text-white hover:bg-theme-autumn/50 rounded-md"
                onClick={() => changeTheme("theme-autumn")}
              >
                Espresso
              </button>
            </li>
            <li>
              <button
                className="w-full p-2 bg-theme-electric/80 text-xl text-white hover:bg-theme-orange/50 rounded-md "
                onClick={() => changeTheme("theme-electric")}
              >
                Electric
              </button>
            </li>
            <li>
              <button
                className="w-full p-2 bg-theme-blue/60 text-xl text-white hover:bg-theme-blue/50 rounded-md "
                onClick={() => changeTheme("theme-blue")}
              >
                Ocean
              </button>
            </li>
            <li>
              <button
                className="w-full p-2 bg-purple-500/80 text-xl text-white hover:bg-theme-green/50 rounded-md "
                onClick={() => changeTheme("theme-green")}
              >
                Lavender
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
