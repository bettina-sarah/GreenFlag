/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : Hobbies.tsx
Created By  : Bettina-Sarah Janesch
About       : Ce fichier définit le composant Hobbies, qui affiche une liste de 
              passe-temps sous forme de tags. Chaque passe-temps est affiché dans une 
              boîte stylisée avec une bordure, une couleur d'arrière-plan 
              complémentaire, et des styles de texte définis.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import { HobbiesProps } from "@/interfaces/interfaces";

const Hobbies: React.FC<HobbiesProps> = ({ hobbies }) => {
  return (
    <div className="flex flex-col items-baseline pl-4 pt-1">
      <h2 className="font-nunito-bold text-h2-custom">Interests</h2>
      <div className="flex flex-row flex-wrap">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="font-nunito-semibold p-1 m-1 px-3 border-[2px] border-slate-700 bg-complementary-color rounded-3xl text-muted-text "
          >
            {hobby}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hobbies;
