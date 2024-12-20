/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : ModifyProfilePage.tsx
Created By  : Vincent Fournier (contribution visuelle: Bettina-Sarah Janesch)
About       : Le composant ModifyProfilePage récupère les données de profil, affiche 
              le profil avec ProfileCard et un formulaire de questionnaire pour la 
              modification du profil, tout en gérant les états de chargement et d'erreur.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import Menu from "@/components/menu_components/Menu";
import { NotificationProvider } from "@/components/NotificationContext";
import QuestionnaireForm from "@/components/form_components/QuestionnaireForm";
import ProfileCard from "@/components/ProfileCard";
import useFetch from "@/api/useFetch";
import { SingleProfileData } from "@/interfaces/interfaces";

const ModifyProfilePage: React.FC = () => {

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useFetch<SingleProfileData>({
    url: "/get-profile",
    data: { id: sessionStorage.getItem("id") },
  });

  if (!profileData && profileLoading) {
    return <div>Loading...</div>;
  }

  if (!profileData && !profileLoading && profileError) {
    return (
      <div>
        <div>Error: {profileError}</div>
      </div>
    );
  }

  return (
    <div className="bg-primary-color flex flex-col justify-between items-center">
      <NotificationProvider>
        <Menu classname="border-secondary-color/20 shadow-md border-2" />
      </NotificationProvider>
      <h1 className="m-3 py-4 text-5xl font-bold text-base-text font-leckerli">
        Your profile
      </h1>
      {profileData && (
        <div>
          <ProfileCard
            profile_info={profileData.profile_info}
            photos={profileData.photo_keys}
          />
        </div>
      )}

      <h1 className="m-3 pt-5 text-5xl font-bold text-base-text font-leckerli">
        Modify your profile
      </h1>
      <div className="flex-grow-1 flex flex-col justify-evenly items-center">
        <QuestionnaireForm />
      </div>
    </div>
  );
};

export default ModifyProfilePage;
