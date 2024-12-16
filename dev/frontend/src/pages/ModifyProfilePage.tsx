import React from "react";
import Menu from "@/components/menu_components/Menu";
import { NotificationProvider } from "@/components/NotificationContext";
import { useNavigate } from "react-router-dom";
import QuestionnaireForm from "@/components/form_components/QuestionnaireForm";
import ProfileCard from "@/components/ProfileCard";
import useFetch from "@/api/useFetch";
import { ProfileProps } from "./MatchingPage";

export interface SingleProfileData {
  profile_info: ProfileProps;
  photo_keys: string[];
}

const ModifyProfilePage: React.FC = () => {
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
    <div className="bg-primary-color flex flex-col justify-between items-center">
      <NotificationProvider>
        <Menu />
      </NotificationProvider>
      <h1 className="m-3 py-4 text-5xl font-bold text-base-text font-leckerli">
        Your profile
      </h1>
      {profileData && (
        <div className="w-full">
          <ProfileCard
            profile_info={profileData.profile_info}
            photos={profileData.photo_keys}
          />
        </div>
      )}

      <h1>Modify your profile</h1>
      <div className="flex-grow-1 flex flex-col justify-evenly items-center">
        <QuestionnaireForm />
      </div>
    </div>
  );
};

export default ModifyProfilePage;
