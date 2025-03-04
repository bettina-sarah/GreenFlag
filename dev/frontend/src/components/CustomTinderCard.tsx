/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : CustomTinderCard.tsx
Created By  : Bettina-Sarah Janesch
About       : Le composant CustomTinderCard utilise TinderCard pour permettre de 
              swiper les suggestions de profil. Il gère les actions de swipe à gauche 
              et à droite, ainsi que le retrait d'une carte de l'écran. Le composant 
              affiche également des informations sur le profil, telles que les photos, 
              les informations de base, les objectifs relationnels, les hobbies et la 
              biographie via divers composants.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import PhotoCarousel from "./profile_card_components/PhotoCarousel";
import BasicInfo from "./profile_card_components/BasicInfo";
import RelationshipGoals from "./profile_card_components/RelationshipGoals";
import Hobbies from "./profile_card_components/Hobbies";
import Bio from "./profile_card_components/Bio";
import { IProfileProps } from "@/interfaces/interfaces";
import TinderCard from "react-tinder-card";

const CustomTinderCard: React.FC<IProfileProps> = ({
  swipeLeft,
  swipeRight,
  suggestion_id,
  profile_info,
  photos,
  isLastCard,
  onLastCardLeftScreen,
}) => {
  const onSwipe = (direction: string, suggestion_id: string) => {
    if (direction == "left") {
      swipeLeft(suggestion_id, isLastCard);
    } else if (direction == "right") {
      swipeRight(suggestion_id, isLastCard);
    }
  };

  const handleCardLeftScreen = () => {
    if (isLastCard && onLastCardLeftScreen) {
      onLastCardLeftScreen();
    }
  };

  return (
    <div>
      <TinderCard
        className="absolute"
        onSwipe={(direction) => onSwipe(direction, suggestion_id)}
        preventSwipe={["up", "down"]}
        onCardLeftScreen={handleCardLeftScreen}
      >
        <div
          className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]   w-full max-w-[550px] lg:max-w-[600px] bg-primary-color rounded-e-md 
        relative h-[750px] lg:h-[800px] xl:h-[900px] overflow-hidden"
        >
          <PhotoCarousel images={photos} />
          {/* </div> */}
          <div className="max-h-[700px] overflow-auto">
            <BasicInfo
              basic_info={profile_info.basic_info}
              suggestion_id={suggestion_id}
            />
            <RelationshipGoals
              relationship={profile_info.relationship}
              wants_kids={profile_info.wants_kids}
            />
            <Hobbies hobbies={profile_info.hobby_array} />
            <Bio bio={profile_info.bio} />
          </div>
        </div>
      </TinderCard>
    </div>
  );
};

export default CustomTinderCard;
