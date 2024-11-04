import React from "react";
import PhotoCarousel from "./profile_card_components/PhotoCarousel";
import BasicInfo from "./profile_card_components/BasicInfo";
import RelationshipGoals from "./profile_card_components/RelationshipGoals";
import Hobbies from "./profile_card_components/Hobbies";
import Bio from "./profile_card_components/Bio";

interface ProfileProps {
  user:
    | {
        profile_info: {
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
      }
    | any
    | undefined;
  photos: any;
}

// ({user})
const ProfileCard: React.FC<ProfileProps> = ({ user, photos }) => {
  console.log(photos);
  return (
    <div className="w-96 bg-greenflag-green p-1 rounded">
      <PhotoCarousel images={photos} />
      <BasicInfo basic_info={user.profile_info.basic_info} />
      <RelationshipGoals
        relationship={user.profile_info.relationship}
        wants_kids={user.profile_info.wants_kids}
      />
      <Hobbies hobbies={user.profile_info.hobby_array} />
      <Bio bio={user.profile_info.bio} />
    </div>
  );
};

export default ProfileCard;
