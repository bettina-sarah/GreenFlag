import React from "react";
import Menu from "@/components/Menu";
import ProfileCard from "@/components/ProfileCard";
import useFetch from "@/api/useFetch";
// import fetchData from "@/api/fetchData";
// import { useState, useEffect } from "react";

// interface IPhotoData {
//   path: string;
//   key: string;
// }

interface IProfileData {
  suggestion_id: string;
  user_infos: {
    profile_info: ProfileProps;
    photo_keys: string[];
  };
}

export interface ProfileProps {
  basic_info: {
    first_name: string;
    age: number;
    city: string;
    location: number;
  };
  relationship: string;
  wants_kids: boolean;
  hobby_array: string[];
  bio: string | null;
}

const MatchingPage: React.FC = () => {
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useFetch<IProfileData[]>({
    url: "/suggestions",
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
    <div className="w-full h-full flex flex-col items-center">
      <Menu />
      <div className="relative w-96 pt-3">
        {profileData &&
          profileData?.map((profile, index) => (
            <ProfileCard
              key={index}
              profile_info={profile.user_infos.profile_info}
              photos={profile.user_infos.photo_keys}
            />
          ))}
        {!profileData && !profileLoading && !profileError && (
          <div>
            <div>No matching profiles found.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingPage;
