import React, { useState } from "react";
import PhotoCarousel from "./profile_card_components/PhotoCarousel";
import BasicInfo from "./profile_card_components/BasicInfo";
import RelationshipGoals from "./profile_card_components/RelationshipGoals";
import Hobbies from "./profile_card_components/Hobbies";
import Bio from "./profile_card_components/Bio";

interface ChatroomProps {
  name: string;
  subject: {
    id:number;
    firstname:string;
    profile_photo:any;
  };
  last_message: {
    sender_id: number;
    sender_first_name: string;
    content: string;
    date_sent: string;
  };
}

// ({user})
const ChatroomItem: React.FC<ChatroomProps> = ({ name, subject, last_message }) => {
  const chatroom_name = name;

  return (
    <div className="w-96 bg-greenflag-green p-1 rounded">
      <Subject subject={subject}/>
      <LastMessage lastmessage={last_message}/>
    </div>
  );
};

export default ProfileCard;