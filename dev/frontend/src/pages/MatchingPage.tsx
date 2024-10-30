import React from "react";
import Menu from "@/components/Menu";
import ProfileCard from "@/components/ProfileCard";
import useFetch from "@/api/useFetch";

const hobby_array = ["Hiking", "Yoga", "Photography", "Cooking", "Traveling"];
const bio =
  "Blabla Me. I blabla when i want to have fun. i am blabla blablabla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const basic_info = {
  firstname: "Lucas",
  age: 35,
  city: "Montreal",
  location: 10,
};
const relationship = "short term relationship";
const wants_kids = false;

const user = {
  basic_info: basic_info,
  relationship: relationship,
  wants_kids: wants_kids,
  hobby_array: hobby_array,
  bio: bio,
};

interface IProfileData {
  id: string;
}

interface IPhotoData {
  id: string;
}


const MatchingPage: React.FC = () => {
  const {data: profileData, loading: profileLoading, error: profileError } = useFetch<IProfileData>({
    url: "//get-profile",
    data: { id: "11" },
  });

  if (!profileData && profileLoading) {
    return <div>Loading...</div>;
  }

  if (!profileData && !profileLoading && profileError) {
    return <div>Error: {profileError}</div>;
  }

  if (profileData && !profileLoading && !profileError) {
    // i now search photo after photo
    const { data, loading, error } = useFetch<IPhotoData>({
      url: "//get-photo",
      data: { id: "11" },
    });

    if (!data && loading) {
      return <div>Loading...</div>;
    }
  
    if (!data && !loading && error) {
      return <div>Error: {error}</div>;
    }
    if (data && !loading && !error) {
      return (
        <div className="w-full h-full flex flex-col justify-evenly items-center">
          <Menu />
          <ProfileCard user={user} />
        </div>
      );
    }
  }

  return null;
};

export default MatchingPage;
