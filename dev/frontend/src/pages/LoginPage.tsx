/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : LoginPage.tsx
Created By  : Vincent Fournier (contribution visuelle: Bettina-Sarah Janesch)
About       : Le composant Login affiche un formulaire de connexion et gère un message 
              indiquant que le compte a été créé avec succès si l'utilisateur est 
              revenu après avoir créé un compte. Il utilise IconButton pour naviguer 
              en arrière et affiche un message d'alerte temporaire lorsqu'un compte 
              est créé avec succès.
====================================================================================
------------------------------------------------------------------------------------
*/

import IconButton from "@/components/IconButton";
import LoginForm from "@/components/form_components/LoginForm";
import React from "react";
import { useState } from "react";
import BackArrowIcon from "@/../ressources/icons/back_arrow.png";

const Login: React.FC = () => {
  const [showAccountCreatedMessage, setshowAccountCreatedMessage] =
    useState(false);

  if (
    localStorage.getItem("accountCreated") === "true" &&
    !showAccountCreatedMessage
  ) {
    setshowAccountCreatedMessage(true);
    localStorage.removeItem("accountCreated");
    localStorage.setItem("fillQuestionnaire", "true");
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center bg-home-bg2 bg-cover bg-center">
      <div className="absolute top-2 left-2">
        <IconButton icon={BackArrowIcon} page=" " className="p-2" />
      </div>
      <h1 className="mt-[30vh] text-5xl font-bold text-h1-darkblue font-leckerli">
        Welcome Back!
      </h1>
      {showAccountCreatedMessage && (
        <div className="relative">
          <div
            className="w-[300px] absolute top-[1.5rem] -left-[8.5rem] px-4 mt-22 
          text-custom-bg font-nunito-bold text-3xl alert alert-success"
          >
            Account created successfully. Please log in.
          </div>
        </div>
      )}
      <div className="flex flex-col mb-20 py-3 w-5/6">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
