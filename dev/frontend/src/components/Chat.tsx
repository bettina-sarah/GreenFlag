import React from "react";
import { Avatar } from "flowbite-react";



interface ChatProps {
    subject: {
        id:number;
        firstname:string;
        profile_photo:any;
      };
  }
  
  const Chat: React.FC<ChatProps> = ({ subject }) => {
    return (
      <div className="flex flex-row items-baseline pl-4 pt-1">
        <Avatar img={subject.profile_photo} rounded />
        <h1>{subject.firstname}</h1>
      </div>
    );
  };
  
  export default Chat;