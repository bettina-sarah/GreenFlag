import React from "react";
import LastMessage from "./chatroom_item_components/LastMessage";
// import Subject from "./chatroom_item_components/Subject";
import { useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";


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
    navigate(`/chatroom/${name}`);
  }

  return (
    <div className="flex grow bg-emerald-100 p-1 m-1 border-b-2 border-button-dark" onClick={handleClick}>
      <Avatar img={subject.profile_photo?.path || undefined} rounded size="lg">
        <h2 className="font-inter text-h1-darkblue text-start">{subject.firstname}</h2>
        <LastMessage last_message={last_message} subject_first_name={subject.firstname}/>
      </Avatar>
      {/* <Subject subject={subject}/> */}
    </div>
  );
};

export default ChatroomItem;