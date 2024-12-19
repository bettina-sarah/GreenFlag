/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : SettingsPage.tsx
Created By  : Vincent Fournier (contribution visuelle: Bettina-Sarah Janesch)
About       : Le composant SettingsPage récupère les données du profil utilisateur, 
              affiche une ProfileCard avec les informations de l'utilisateur, et 
              fournit des formulaires pour modifier le profil et supprimer le compte, 
              en utilisant useFetch pour la récupération de données et des hooks pour 
              la gestion de l'état et de la navigation.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import DeleteAccountForm from "@/components/form_components/DeleteAccountForm";
import Menu from "@/components/menu_components/Menu";
import { NotificationProvider } from "@/components/NotificationContext";
import { useNavigate } from "react-router-dom";
import QuestionnaireForm from "@/components/form_components/QuestionnaireForm";
import ProfileCard from "@/components/ProfileCard";
import useFetch from "@/api/useFetch";
import { SingleProfileData } from "@/interfaces/interfaces";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

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
    <div className="w-full h-full flex flex-col justify-between items-center">
      <NotificationProvider>
        <Menu />
      </NotificationProvider>

      {profileData && (
        <div className="p-6">
          <ProfileCard
            profile_info={profileData.profile_info}
            photos={profileData.photo_keys}
          />
        </div>
      )}

      <h1>Modify your profile</h1>
      <div className="flex-grow-1 flex flex-col justify-evenly items-center">
        <h1 className="text-3xl font-bold text-teal-500">Questionnaire</h1>
        <QuestionnaireForm />
      </div>
      <h1>Logout</h1>
      <button
        onClick={() => {
          sessionStorage.clear();
          navigate("/");

        }}
        className="bg-red-600 p-1 rounded-md text-white"
        type="submit"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold text-teal-500">Delete account !</h1>
      <div className="flex flex-col m-2 py-3">
        <DeleteAccountForm />
      </div>
    </div>
  );
};

export default SettingsPage;
