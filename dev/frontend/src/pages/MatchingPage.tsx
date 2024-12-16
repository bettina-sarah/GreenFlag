import React, { useEffect, useState } from "react";
import Menu from "@/components/menu_components/Menu";
import { NotificationProvider } from "@/components/NotificationContext";
import CustomTinderCard from "@/components/CustomTinderCard";
import useTriggerFetch from "@/api/useTriggerFetch";
import IconButton from "@/components/IconButton";

import RedFlag from "../../ressources/icons/FlagButton_left.png";
import GreenFlag from "../../ressources/icons/FlagButton_right.png";
import { updateSuggestion } from "@/api/updateSuggestion";

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
  const algo = sessionStorage.getItem("algo") || "Meanshift";
  const [cardsSwiped, setCardsSwiped] = useState<
    { suggestion_id: string; swiped: boolean }[]
  >([]);
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useTriggerFetch<IProfileData[]>(
    {
      url: "/suggestions",
      data: { id: sessionStorage.getItem("id"), algo: algo },
    },
    refetchTrigger
  );

  const handleEndOfList = () => {
    setRefetchTrigger((prev) => prev + 1); // Increment trigger to refetch
  };

  useEffect(() => {
    if (profileData && profileData.length > 0) {
      setCardsSwiped(
        profileData.map((element) => {
          return {
            suggestion_id: element.suggestion_id,
            swiped: false,
          };
        })
      );
    }
  }, [profileData]);

  if (!profileData && profileLoading) {
    return <div>Loading...</div>;
  }

  const SwipeRight = (suggestion_id: string, isLastCard: boolean) => {
    updateSuggestion(suggestion_id, "yes");
    const foundIndex = cardsSwiped.findIndex(
      (card) => card.suggestion_id === suggestion_id
    );
    if (foundIndex > -1) {
      setCardsSwiped((prevCards) => {
        prevCards[foundIndex].swiped = true;
        return [...prevCards];
      });
    }
    console.log("right: ", suggestion_id);
    console.log("isLastCard:", isLastCard);
    // setCurrentIndex(currentIndex + 1);
    // console.log("currentIndex:", currentIndex);
    if (isLastCard) {
      handleEndOfList();
    }
  };

  const SwipeLeft = (suggestion_id: string, isLastCard: boolean) => {
    updateSuggestion(suggestion_id, "no");
    const foundIndex = cardsSwiped.findIndex(
      (card) => card.suggestion_id === suggestion_id
    );
    if (foundIndex > -1) {
      setCardsSwiped((prevCards) => {
        prevCards[foundIndex].swiped = true;
        return [...prevCards];
      });
    }
    // setCurrentIndex(currentIndex + 1);
    // console.log("currentIndex:", currentIndex);
    console.log("left: ", suggestion_id);
    if (isLastCard) {
      handleEndOfList();
    }
  };

  if (!profileData && !profileLoading && profileError) {
    return (
      <div>
        <div>Error: {profileError}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <NotificationProvider>
        <Menu />
      </NotificationProvider>
      <div className="relative h-72 w-96 pt-3">
        {profileData && profileData.length > 0
          ? profileData.map((profile, index) => {
              const hasSwiped = cardsSwiped[index]?.swiped;

              return (
                console.log("index: ", index),
                !hasSwiped && (
                  <div>
                    <CustomTinderCard
                      swipeLeft={SwipeLeft}
                      swipeRight={SwipeRight}
                      key={profile.suggestion_id} // Ensure unique key for each card
                      profile_info={profile.user_infos.profile_info}
                      photos={profile.user_infos.photo_keys}
                      suggestion_id={profile.suggestion_id}
                      isLastCard={index === 0} // Mark the last card
                      onLastCardLeftScreen={handleEndOfList} // Callback for end-of-list detection
                    />
                    <div
                      className=" absolute -bottom-[570px] left-0 w-full flex items-center justify-evenly
                    sm:-bottom-[290px] lg:-bottom-[620px]"
                    >
                      <IconButton
                        className="h-28 w-28"
                        icon={RedFlag}
                        onClick={() =>
                          SwipeLeft(profile.suggestion_id, index === 0)
                        } // Pass suggestion_id to the handler
                        suggestion_id={profile.suggestion_id}
                      />
                      <IconButton
                        className="h-28 w-28"
                        icon={GreenFlag}
                        onClick={() =>
                          SwipeRight(profile.suggestion_id, index === 0)
                        }
                        suggestion_id={profile.suggestion_id}
                      />
                    </div>
                  </div>
                )
              );
            })
          : !profileLoading && (
              <div className="rounded-md text-red-800 bg-red-400 p-2 border-red-800 border-2 text-md">
                No matching profiles found.
              </div>
            )}
      </div>
    </div>
  );
};

export default MatchingPage;
