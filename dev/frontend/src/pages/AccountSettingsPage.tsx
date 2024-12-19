/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : AccountSettingsPage.tsx
Created By  : Vincent Fournier
About       : Le composant AccountSettingsPage rassemble différentes fonctionnalités 
              de gestion de compte telles que la sélection d’un assistant, la 
              modification du mot de passe et la suppression de compte, dans une 
              interface centrée sur l’utilisateur et stylisée avec Tailwind CSS.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import DeleteAccountForm from "@/components/form_components/DeleteAccountForm";
import Menu from "@/components/menu_components/Menu";
import { NotificationProvider } from "@/components/NotificationContext";
import ModifyPasswordForm from "@/components/form_components/ModifyPasswordForm";
import AlgoSelector from "@/components/AlgoSelector";

const AccountSettingsPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col min-h-screen justify-between items-center bg-primary-color">
      <NotificationProvider>
        <Menu classname="border-secondary-color/20 shadow-md border-2" />
      </NotificationProvider>

      <div className="flex flex-col  flex-grow justify-around items-center m-6 bg-primary-color rounded-3xl">
        <h1 className="m-3 pt-2 pb-2 text-5xl font-bold text-base-text font-leckerli">
          Account settings
        </h1>
        <h1 className="pt-1 pb-6 text-3xl font-bold text-base-text">
          Choose an assistant for the perfect match
        </h1>

        <AlgoSelector />
      </div>

      <div className="flex flex-col justify-around m-6 bg-primary-color rounded-3xl">
        <h1 className="pt-3 text-3xl font-bold text-base-text">
          Modify your password
        </h1>
        <ModifyPasswordForm />
      </div>

      <div className="flex flex-col justify-around m-6 bg-primary-color rounded-3xl">
        <h1 className="pt-3 text-3xl font-bold text-base-text">
          Delete account
        </h1>
        <DeleteAccountForm />
      </div>
    </div>
  );
};

export default AccountSettingsPage;
