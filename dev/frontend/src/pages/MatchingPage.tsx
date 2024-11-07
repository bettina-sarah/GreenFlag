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
    data: { id: "8" },
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
    <div className="w-full h-full flex flex-col justify-evenly items-center">
      <Menu />
      {profileData && (
        <ProfileCard
          profile_info={profileData[0].user_infos.profile_info}
          photos={profileData[0].user_infos.photo_keys}
        />
      )}
    </div>
  );
};

export default MatchingPage;

// const MatchingPage: React.FC = () => {
//   const {
//     data: profileData,
//     loading: profileLoading,
//     error: profileError,
//   } = useFetch<IProfileData>({
//     url: "/suggestions",
//     data: { id: "1" },
//   });

//   const [photoData, setPhotoData] = useState<IPhotoData[]>([]);

//   useEffect(() => {
//     if (profileData && !profileLoading && !profileError) {
//       const photoKeys = profileData[0]?.user_infos?.photo_keys;

//       if (!photoKeys) {
//         setPhotoData([]);
//       } else {
//         const fetchPhotos = async () => {
//           try {
//             const fetchedPhotos: IPhotoData[] = await Promise.all(
//               photoKeys.map(async (key: string) => {
//                 const photo = await fetchData<IPhotoData>("/get-photo", key);
//                 return { key, path: photo.path };
//               })
//             );
//             setPhotoData(fetchedPhotos);
//           } catch (error) {
//             console.error("Error fetching photos:", error);
//           }
//         };
//         fetchPhotos();
//       }
//     }
//   }, []); //[profileData, profileLoading, profileError]

//   if (!profileData && profileLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!profileData && !profileLoading && profileError) {
//     return (
//       <div>
//         <div>Error: {profileError}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-full flex flex-col justify-evenly items-center">
//       <Menu />
//       <ProfileCard
//         user={profileData[0].user_infos.profile_info}
//         photos={photoData}
//       />
//     </div>
//   );
// };
