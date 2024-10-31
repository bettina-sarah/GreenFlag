import React from "react";
import Menu from "@/components/Menu";
import ProfileCard from "@/components/ProfileCard";
import useFetch from "@/api/useFetch";
import fetchData from "@/api/fetchData";
import { useState, useEffect } from "react";
import { userInfo } from "os";

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
  path: string;
  key: string;
}

const MatchingPage: React.FC = () => {
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useFetch<IProfileData>({
    url: "//get-profile",
    data: { id: "11" },
  });
  const [photoData, setPhotoData] = useState<IPhotoData[]>([]);

  useEffect(() => {
    if (profileData && !profileLoading && !profileError) {
      const photoKeys = profileData[1];

      // Fetch all photos based on photo keys
      const fetchPhotos = async () => {
        try {
          //Promise.all ensures that all the promises (in this case, each fetchData call for each key) are resolved before it moves to the next line.
          //This means that once all the photo fetches are completed, the resulting array of fetched photos will be passed into setPhotoData.
          const fetchedPhotos: IPhotoData[] = await Promise.all(
            photoKeys.map(async (key: string) => {
              const photo = await fetchData<IPhotoData>("/get-photo", key);
              return {
                key,
                data: photo.path, // Assuming photo.path is a URL or Base64 string
              };
            })
          );
          setPhotoData(fetchedPhotos);
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      };

      fetchPhotos();
    }
  }, [profileData, profileLoading, profileError]);

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
    <div className="w-full h-full flex flex-col justify-evenly items-center">
      <Menu />
      <ProfileCard user={profileData[0]} photos={photoData} />
      {/* user={user} */}
    </div>
  );
};

// return null;
// };

export default MatchingPage;

// if (profileData && !profileLoading && !profileError) {
// [ [] , [ keys]    ]
// userInfo = profileData[0];
// photoKeys = profileData[1];

// console.log(profileData[1][0]);

// for (let i = 0; i < photoKeys.length; i++) {
//   fetchData<IPhotoData>('/get-photo',photoKeys[i])
//   //path: string, data: any

// }

// const { path: photoPath, data: photoData } = fetchData<IPhotoData>({
//   url: "//get-photo",
//   key: profileData[1][0],
// });
