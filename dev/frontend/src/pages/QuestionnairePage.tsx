/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : QuestionnairePage.tsx
Created By  : Vincent Fournier
About       : Le composant QuestionnairePage affiche un titre et un QuestionnaireForm 
              dans un conteneur flex avec un fond de couleur primaire, offrant de 
              l'espace pour l'interaction utilisateur.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
// import Menu from "@/components/Menu";
import QuestionnaireForm from "@/components/form_components/QuestionnaireForm";

const QuestionnairePage: React.FC = () => {
  return (
    <div className="bg-primary-color flex-grow-1 flex flex-col justify-evenly items-center">
      <h1 className="m-3 py-4 text-5xl font-bold text-base-text font-leckerli">
        Questionnaire
      </h1>
      <QuestionnaireForm />
    </div>
  );
};
export default QuestionnairePage;
