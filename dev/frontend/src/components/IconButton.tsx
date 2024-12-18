/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : IconButton.tsx
Created By  : Bettina-Sarah Janesh
About       : Le composant IconButton prend en entrée des props pour afficher une 
              icône, naviguer vers une page, exécuter une fonction personnalisée 
              onClick, et gérer l'état de l'icône. Il utilise le composant Icon pour 
              afficher l'icône, et gère les clics pour naviguer, appeler onClick, et 
              toggler l'état d'activation si nécessaire.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconButtonProps } from "@/interfaces/interfaces";

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  page,
  onClick,
  disabled,
  toggleState,
  className,
}) => {
  const [isActive, setIsActive] = useState<boolean>(toggleState || false);
  const [customClassName] = useState<string>(className || "");
  const navigate = useNavigate();

  const handleClick = () => {
    if (page) {
      navigate(`/${page}`);
    }

    // If a custom onClick function is provided, execute it
    if (onClick) {
      console.log("onclick");
      onClick(); // !! when i define my button, i can provide it any function i want !!!
    }

    // If the button has a toggleState prop, toggle its state
    if (toggleState !== undefined) {
      setIsActive((prev) => !prev);
    }
    if (isActive) {
      console.log(
        "im now an active button .. if you want, execute smth extra here idk"
      );
    }
  };

  return (
    <div>
      <button
        className={`w-15 h-12 flex items-center justify-center p-1 border-none
    hover:bg-gray-500/30 rounded ${customClassName || ""}`}
        onClick={handleClick}
        disabled={disabled}
      >
        <Icon icon={icon} />
      </button>
    </div>
  );
};

export default IconButton;
