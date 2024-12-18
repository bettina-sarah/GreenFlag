import React from "react";
import PhotoCarousel from "./profile_card_components/PhotoCarousel";
import BasicInfo from "./profile_card_components/BasicInfo";
import RelationshipGoals from "./profile_card_components/RelationshipGoals";
import Hobbies from "./profile_card_components/Hobbies";
import Bio from "./profile_card_components/Bio";
import { IProfileCardProps } from "@/interfaces/interfaces";

const ProfileCard: React.FC<IProfileCardProps> = ({ profile_info, photos }) => {
  return (
    <div
      className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]   w-full max-w-[400px] lg:max-w-[450px] bg-primary-color rounded-e-md 
  relative h-[750px] lg:h-[800px] xl:h-[900px] overflow-hidden"
    >
      <PhotoCarousel images={photos} />
      <div className="max-h-[700px] overflow-auto">
        <BasicInfo basic_info={profile_info.basic_info} />
        <RelationshipGoals
          relationship={profile_info.relationship}
          wants_kids={profile_info.wants_kids}
        />
        <Hobbies hobbies={profile_info.hobby_array} />
        <Bio bio={profile_info.bio} />
      </div>
    </div>
  );
};

export default ProfileCard;
