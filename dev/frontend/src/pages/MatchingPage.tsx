import React from "react";
import Menu from "@/components/Menu";
import ProfileCard from "@/components/ProfileCard";
import useFetch from "@/api/useFetch";
import fetchData from "@/api/fetchData";
import { useState, useEffect } from "react";

// const hobby_array = ["Hiking", "Yoga", "Photography", "Cooking", "Traveling"];
// const bio =
//   "Blabla Me. I blabla when i want to have fun. i am blabla blablabla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// const basic_info = {
//   firstname: "Lucas",
//   age: 35,
//   city: "Montreal",
//   location: 10,
// };
// const relationship = "short term relationship";
// const wants_kids = false;

// const user = {
//   basic_info: basic_info,
//   relationship: relationship,
//   wants_kids: wants_kids,
//   hobby_array: hobby_array,
//   bio: bio,
// };

interface IPhotoData {
  path: string;
  key: string;
}

interface IProfileData {
  id: string;
}

// interface UserData {
//   suggestion_id: number;
//   user_infos: UserInfos;
// }

const MatchingPage: React.FC = () => {
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useFetch<IProfileData>({
    url: "//suggestions",
    data: { id: "1" },
  });

  // const [suggestions, setSuggestions] = useState<UserData[]>([]);
  const [photoData, setPhotoData] = useState<IPhotoData[]>([]);

  useEffect(() => {
    if (profileData && !profileLoading && !profileError) {
      // console.log("use effect profile daTA", profileData);
      // const suggestionList: UserData[] = profileData.map((element: any) => ({
      //   suggestion_id: element.user.suggestion_id,
      //   user_infos: element.user.user_infos,
      // }));

      // setSuggestions(suggestionList);

      // const suggestion_list: IUserData[] = [];
      // console.log(profileData);
      // setSuggestions(profileData);

      // profileData.forEach((user: any) => {
      //   suggestion_list.push(user.suggestion_id);
      // });
      // setSuggestions(suggestion_list);
      // const photoKeys = profileData[1];

      const photoKeys = profileData[0]?.user_infos?.photo_keys;

      if (!photoKeys) {
        setPhotoData([]); // photo_keys is null
      } else {
        const fetchPhotos = async () => {
          try {
            const fetchedPhotos: IPhotoData[] = await Promise.all(
              photoKeys.map(async (key: string) => {
                const photo = await fetchData<IPhotoData>("/get-photo", key);
                return { key, path: photo.path };
              })
            );
            setPhotoData(fetchedPhotos);
          } catch (error) {
            console.error("Error fetching photos:", error);
          }
        };
        fetchPhotos();
      }
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
      <ProfileCard
        user={profileData[0].user_infos.profile_info}
        photos={photoData}
      />
      {/* user={user} */}
    </div>
  );
};

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
