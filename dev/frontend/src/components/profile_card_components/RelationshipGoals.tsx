/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : RelationshipGoals.tsx
Created By  : Bettina-Sarah Janesch
About       : RelationshipGoals est un composant React qui affiche les objectifs 
              relationnels et les préférences concernant la parentalité d'un 
              utilisateur, en utilisant des tags stylisés pour chaque option.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import { RelationshipProps } from "@/interfaces/interfaces";

const RelationshipGoals: React.FC<RelationshipProps> = ({
  relationship,
  wants_kids,
}) => {
  return (
    <div className="flex flex-col items-baseline pl-4 pt-1 select-none">
      <h2 className="font-nunito-bold text-h2-custom">Relationship Goals</h2>
      <div className="flex flex-wrap">
        <div className="font-nunito-semibold p-1 m-1 px-3 border-[2px] border-slate-700 bg-complementary-color rounded-3xl text-muted-text ">
          {relationship} 💕
        </div>

        <div className="font-nunito-semibold p-1 px-3 m-1 border-[2px] border-slate-700 bg-complementary-color rounded-3xl text-muted-text ">
          {wants_kids ? "Wants kids 🍼" : "Doesn't want kids ❌"}
        </div>
      </div>
    </div>
  );
};

export default RelationshipGoals;
