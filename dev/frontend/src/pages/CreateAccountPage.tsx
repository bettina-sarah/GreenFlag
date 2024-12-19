/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : CreateAccountPage.tsx
Created By  : Vincent Fournier
About       : Le composant CreateAccount affiche une icône de retour, un titre pour 
              créer un compte, et un formulaire d'enregistrement. Il utilise 
              IconButton pour naviguer en arrière et RegisterForm pour le formulaire 
              d'inscription. Le style du titre est également transformé pour un effet 
              visuel.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import RegisterForm from "@/components/form_components/RegisterForm";
import BackArrowIcon from "@/../ressources/icons/back_arrow.png";
import IconButton from "@/components/IconButton";

const CreateAccount: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-between bg-home-bg2 bg-cover bg-center">
    <IconButton icon={BackArrowIcon} page=" " className="place-self-start" />
    <h1
      className="text-5xl font-bold text-text-base font-leckerli"
      style={{ transform: "translateY(3rem) rotate(-18deg)" }}
    >
      Create Account
    </h1>
    <div className="flex flex-col m-2 py-3 w-screen">
      <RegisterForm />
    </div>
  </div>
);

export default CreateAccount;
