import React from "react";
import PhotoCarousel from "./profile_card_components/PhotoCarousel";
import BasicInfo from "./profile_card_components/BasicInfo";
import RelationshipGoals from "./profile_card_components/RelationshipGoals";
import Hobbies from "./profile_card_components/Hobbies";
import Bio from "./profile_card_components/Bio";
import { ProfileProps } from "@/pages/MatchingPage";
import IconButton from "./IconButton";
import RedFlag from "../../ressources/icons/FlagButton_left.png";
import GreenFlag from "../../ressources/icons/FlagButton_right.png";
import Undo from "../../ressources/icons/undo.png";
import TinderCard from "react-tinder-card";

interface IProfileProps {
  profile_info: ProfileProps;
  photos: string[];
}


const SwipeRight = () => {
  onSwipe('right'); // Calls swipe logic as if swiped right
};

const SwipeLeft = () => {
  onSwipe('left'); // Calls swipe logic as if swiped left
};

const onSwipe = (direction: string) => {
  console.log('You swiped: ' + direction)
}

const ProfileCard: React.FC<IProfileProps> = ({ profile_info, photos }) => {
  console.log(photos);
  return (
    <div>
      <TinderCard onSwipe={onSwipe} preventSwipe={["right", "left"]}>
        <div className="w-96 bg-greenflag-green p-1 rounded">
          <PhotoCarousel images={photos} />
          <BasicInfo basic_info={profile_info.basic_info} />
          <RelationshipGoals
            relationship={profile_info.relationship}
            wants_kids={profile_info.wants_kids}
          />
          <Hobbies hobbies={profile_info.hobby_array} />
          <Bio bio={profile_info.bio} />
          <div className="flex items-center justify-evenly p-3">
            <IconButton icon={RedFlag} onClick={SwipeRight} />
            <IconButton icon={GreenFlag} onClick={SwipeLeft} />
          </div>
        </div>
      </TinderCard>
    </div>
  );
};

export default ProfileCard;
