import React from "react";
import LastMessage from "./chatroom_item_components/LastMessage";
import Subject from "./chatroom_item_components/Subject";
import { useNavigate } from "react-router-dom";

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

const ChatroomItem: React.FC<ChatroomProps> = ({ name, subject, last_message }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/chatroom/${name}/${subject.id}`);
  }

  return (
    <div className="w-96 bg-greenflag-green p-1 rounded" onClick={handleClick}>
      <Subject subject={subject}/>
      <LastMessage last_message={last_message}/>
    </div>
  );
};

export default ChatroomItem;