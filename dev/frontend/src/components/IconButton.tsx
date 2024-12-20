/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : IconButton.tsx
Created By  : Bettina-Sarah Janesch
About       : Le composant IconButton prend en entrée des props pour afficher une 
              icône, naviguer vers une page ou exécuter une fonction personnalisée 
              onClick. Il utilise le composant Icon pour 
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
  className,
}) => {
  const [customClassName] = useState<string>(className || "");
  const navigate = useNavigate();

  const handleClick = () => {
    if (page) {
      navigate(`/${page}`);
    }

    if (onClick) {
      onClick();
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
