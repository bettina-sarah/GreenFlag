import React, { useState, useEffect } from "react";
import Menu from "@/components/Menu";
// import useFetch from "@/api/useFetch";
import { NotificationProvider } from "@/components/NotificationContext";
import CustomTinderCard from "@/components/CustomTinderCard";
import useTriggerFetch from "@/api/useTriggerFetch";

export interface IProfileData {
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
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useTriggerFetch<IProfileData[]>(
    {
      url: "/suggestions",
      data: { id: sessionStorage.getItem("id") },
    },
    refetchTrigger
  );

  const handleEndOfList = () => {
    setRefetchTrigger((prev) => prev + 1); // Increment trigger to refetch
  };

  // // Debugging ONLY: Check data changes
  // useEffect(() => {
  //   console.log("Updated profileData:", profileData);
  // }, [profileData]);

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
      <NotificationProvider>
        <Menu />
      </NotificationProvider>
      <div className="relative w-96 pt-3">
        {profileData && profileData.length > 0
          ? profileData.map(
              (profile, index) => (
                console.log("index: ", index),
                (
                  <CustomTinderCard
                    key={profile.suggestion_id} // Ensure unique key for each card
                    profile_info={profile.user_infos.profile_info}
                    photos={profile.user_infos.photo_keys}
                    suggestion_id={profile.suggestion_id}
                    isLastCard={index === 0} // Mark the last card
                    onLastCardLeftScreen={handleEndOfList} // Callback for end-of-list detection
                  />
                )
              )
            )
          : !profileLoading && (
              <div className="rounded-md text-red-800 bg-red-400 p-2 border-red-800 border-2 text-md">
                No matching profiles found.
              </div>
            )}
      </div>
    </div>
  );

  // return (
  //   <div className="w-full h-full flex flex-col items-center">
  //     <NotificationProvider>
  //       <Menu />
  //     </NotificationProvider>
  //     <div className="relative w-96 pt-3">
  //       {profileData &&
  //         profileData?.map(
  //           (profile, index) => (
  //             console.log("index: ", index),
  //             (
  //               <CustomTinderCard
  //                 key={index}
  //                 profile_info={profile.user_infos.profile_info}
  //                 photos={profile.user_infos.photo_keys}
  //                 suggestion_id={profile.suggestion_id}
  //                 isLastCard={index === 0} // Mark the last card
  //                 onLastCardLeftScreen={handleEndOfList} // Pass the callback
  //               />
  //             )
  //           )
  //         )}
  //       {!profileData && !profileLoading && !profileError && (
  //         <div>
  //           <div className="rounded-md text-red-800 bg-red-400 p-2 border-red-800 border-2 text-md">
  //             No matching profiles found.
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default MatchingPage;
