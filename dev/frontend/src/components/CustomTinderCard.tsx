import React, { useState } from "react";
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
import { updateSuggestion } from "@/api/updateSuggestion";

interface IProfileProps {
  index: number;
  suggestion_id: string;
  profile_info: ProfileProps;
  photos: string[];
  isLastCard?: boolean; // New prop to mark the last card
  onLastCardLeftScreen?: () => void; // Callback for end-of-list detection
}

const CustomTinderCard: React.FC<IProfileProps> = ({
  index,
  suggestion_id,
  profile_info,
  photos,
  isLastCard,
  onLastCardLeftScreen,
}) => {
  const [hasSwiped, setHasSwiped] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(index);

  const SwipeRight = (suggestion_id: string) => {
    updateSuggestion(suggestion_id, "yes");
    setHasSwiped(true);
    console.log("right: ", suggestion_id);
    console.log("isLastCard:", isLastCard);
    setCurrentIndex(currentIndex + 1);
    console.log("currentIndex:", currentIndex);
    if (isLastCard && onLastCardLeftScreen) {
      onLastCardLeftScreen();
    }
  };

  const SwipeLeft = (suggestion_id: string) => {
    updateSuggestion(suggestion_id, "no");
    setHasSwiped(true);
    setCurrentIndex(currentIndex + 1);
    console.log("currentIndex:", currentIndex);
    console.log("left: ", suggestion_id);
    if (isLastCard && onLastCardLeftScreen) {
      onLastCardLeftScreen();
    }
  };

  const onSwipe = (direction: string, suggestion_id: string) => {
    if (direction == "left") {
      SwipeLeft(suggestion_id);
    } else if (direction == "right") {
      SwipeRight(suggestion_id);
    }
    console.log("You swiped: " + direction);
  };

  //this only gets called when the card leaves the screen, NOT CLICKED
  const handleCardLeftScreen = () => {
    setHasSwiped(true);
    console.log(`Card with suggestion_id ${suggestion_id} was swiped out.`);
    console.log("isLastCard:", isLastCard);

    if (isLastCard && onLastCardLeftScreen) {
      onLastCardLeftScreen();
    }
  };

  return (
    !hasSwiped && (
      <div>
        <TinderCard
          className="absolute"
          onSwipe={(direction) => onSwipe(direction, suggestion_id)}
          preventSwipe={["up", "down"]}
          onCardLeftScreen={handleCardLeftScreen}
        >
          {/* take SROUHTly : shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] */}
          {/* <div className="w-96 bg-primary-color p-1 rounded-3xl relative"> */}
          {/* SHADOW BOX OPTIONS: */}
          {/* option 1: */}
          {/* <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]   min-w-[48vw] max-w-[96vw]    lg:min-w-[23vw] lg:max-w-[24vw] bg-primary-color p-2 rounded-3xl relative min-h-[90vh] max-h-[95vh] lg:min-h-[95vh] lg:max-h-[100vh] overflow-hidden"> */}
          {/* option 2: */}
          {/* <div className="shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]  min-w-[48vw] max-w-[96vw]    lg:min-w-[23vw] lg:max-w-[24vw] bg-primary-color p-2 rounded-3xl relative min-h-[90vh] max-h-[95vh] lg:min-h-[95vh] lg:max-h-[100vh] overflow-hidden"> */}
          <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]   min-w-[48vw] max-w-[96vw]    lg:min-w-[23vw] lg:max-w-[24vw] bg-primary-color rounded-xl relative min-h-[90vh] max-h-[95vh] lg:min-h-[95vh] lg:max-h-[100vh] overflow-hidden">
            {/* <div className="pt-1"> */}
            <PhotoCarousel images={photos} />
            {/* </div> */}
            <div className="max-h-[700px] overflow-auto">
              <BasicInfo basic_info={profile_info.basic_info} />
              <RelationshipGoals
                relationship={profile_info.relationship}
                wants_kids={profile_info.wants_kids}
              />
              <Hobbies hobbies={profile_info.hobby_array} />
              <Bio bio={profile_info.bio} />
            </div>
            <div className="flex items-center justify-evenly p-2">
              <IconButton
                icon={RedFlag}
                onClick={() => SwipeLeft(suggestion_id)} // Pass suggestion_id to the handler
                suggestion_id={suggestion_id}
              />
              <IconButton
                icon={GreenFlag}
                onClick={() => SwipeRight(suggestion_id)}
                suggestion_id={suggestion_id}
              />
            </div>
          </div>
        </TinderCard>
      </div>
    )
  );
};

export default CustomTinderCard;
