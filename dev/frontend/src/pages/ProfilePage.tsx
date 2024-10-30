import React from "react";
import fetchProfile from "@/api/fetchData";

import { useQuery } from "@tanstack/react-query";

interface FetchProfileData {
  email: string;
  // You can add other fields as necessary
}

const ProfilePage: React.FC = () => {
  const email = sessionStorage.getItem("email") || "";
  const requestData = { email }; // Renamed to avoid conflict

  const queryKey = ["profile", requestData] as const;

  const { data, error } = useQuery<
    unknown,
    Error,
    unknown,
    [string, FetchProfileData]
  >(queryKey, () => fetchProfile(requestData));

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <h1 className="text-3xl font-bold text-teal-500">Create Account</h1>
      <div className="flex flex-col m-2 py-3">
        <div>
          {/* Render profile data here */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
