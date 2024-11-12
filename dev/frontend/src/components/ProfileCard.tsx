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
// import Undo from "../../ressources/icons/undo.png";
import TinderCard from "react-tinder-card";

interface IProfileProps {
  suggestion_id: string,
  profile_info: ProfileProps;
  photos: string[];
}

const SwipeRight = (suggestion_id: string) => {
  console.log('right: ', suggestion_id)
};

const SwipeLeft = (suggestion_id: string) => {
  console.log('left: ', suggestion_id)
};

const onSwipe = (direction: string, suggestion_id:string) => {
  if(direction=="left"){
    SwipeLeft(suggestion_id)
  }
  else if(direction=="right"){
    SwipeRight(suggestion_id)
  }
  console.log("You swiped: " + direction);
};

const ProfileCard: React.FC<IProfileProps> = ({ suggestion_id, profile_info, photos }) => {
  console.log(photos);
  return (
    <TinderCard
      className="absolute"
      onSwipe={(direction) => onSwipe(direction,suggestion_id)}
      preventSwipe={["up", "down"]}
    >
      <div className="w-96 bg-greenflag-green p-1 rounded relative">
        <PhotoCarousel images={photos} />
        <BasicInfo basic_info={profile_info.basic_info} />
        <RelationshipGoals
          relationship={profile_info.relationship}
          wants_kids={profile_info.wants_kids}
        />
        <Hobbies hobbies={profile_info.hobby_array} />
        <Bio bio={profile_info.bio} />
        <div className="flex items-center justify-evenly p-3">
          <IconButton icon={RedFlag} onClick={() => SwipeRight(suggestion_id)}  // Pass suggestion_id to the handler
            suggestion_id={suggestion_id} />
          <IconButton icon={GreenFlag} onClick={() => SwipeLeft(suggestion_id)} suggestion_id={suggestion_id} />
        </div>
      </div>
    </TinderCard>
  );
};

export default ProfileCard;
