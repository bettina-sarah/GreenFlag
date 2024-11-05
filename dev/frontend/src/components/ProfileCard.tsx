import React from "react";
import PhotoCarousel from "./profile_card_components/PhotoCarousel";
import BasicInfo from "./profile_card_components/BasicInfo";
import RelationshipGoals from "./profile_card_components/RelationshipGoals";
import Hobbies from "./profile_card_components/Hobbies";
import Bio from "./profile_card_components/Bio";
import IconButton from "./IconButton";
import RedFlag from "../../ressources/icons/FlagButton_left.png"
import GreenFlag from "../../ressources/icons/FlagButton_right.png"
import Undo from "../../ressources/icons/undo.png"

interface ProfileProps {
  user: {
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
  };
  photos: any;
}

const SwipeRight = () => {
  console.log('swiped right')
}

const SwipeLeft = () => {
  console.log('swiped left')
}

const UndoSwipe = () => {
  console.log('undo')
}

const ProfileCard: React.FC<ProfileProps> = ({ user, photos }) => {
  return (
    <div className="w-96 bg-greenflag-green p-1 rounded">
      <PhotoCarousel images={photos} />
      <BasicInfo basic_info={user.basic_info} />
      <RelationshipGoals
        relationship={user.relationship}
        wants_kids={user.wants_kids}
      />
      <Hobbies hobbies={user.hobby_array} />
      <Bio bio={user.bio} />
      <div className="flex items-center justify-evenly p-3">
      <IconButton icon={RedFlag} onClick={SwipeRight}/>
      <IconButton icon={Undo} onClick={UndoSwipe}/>
      <IconButton icon={GreenFlag} onClick={SwipeLeft} />
      </div>

    </div>
  );
};

export default ProfileCard;
