/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : SettingsDropDown.tsx
Created By  : Vincent Fournier (Contribution: Bettina-Sarah Janesch)
About       : Ce composant React, SettingsDropDown, affiche un menu déroulant avec 
              des options pour modifier le profil, accéder aux paramètres du compte 
              ou se déconnecter. Il utilise useNavigate pour rediriger l'utilisateur
              et gère la fermeture automatique du menu lorsqu'on clique à l'extérieur.
====================================================================================
------------------------------------------------------------------------------------
*/

import { useState, useEffect, useRef } from "react";
import IconButton from "../IconButton";
import { useNavigate } from "react-router-dom";
import settingsIcon from "../../../ressources/icons/settings.png";

const SettingsDropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

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
      <IconButton icon={settingsIcon} onClick={() => setIsOpen(!isOpen)} />

      {isOpen && (
        <div className="flex absolute w-48 mt-2 bg-primary-color rounded-md shadow-lg z-10 left-1/2 transform -translate-x-full md:-translate-x-1/2">
          <ul className="w-full space-y-2 p-2">
            <li>
              <button
                className="w-full p-2 text-white text-left font-nunito text-xl rounded-md hover:bg-theme-autumn/50"
                onClick={() => navigate("/modify-profile")}
              >
                Modify profile
              </button>
            </li>
            <li>
              <button
                className="w-full p-2  text-white text-left font-nunito text-xl rounded-md hover:bg-theme-autumn/50"
                onClick={() => navigate("/account-settings")}
              >
                Account settings
              </button>
            </li>
            <li>
              <button
                className="w-full p-2 text-white text-left font-nunito text-xl rounded-md hover:bg-theme-autumn/50"
                onClick={() => {
                  sessionStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SettingsDropDown;