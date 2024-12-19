/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : ChatroomItem.tsx
Created By  : Vincent Fournier
About       : Le composant ChatroomItem affiche un élément de liste représentant un 
              chatroom, incluant le nom du chatroom, la photo de profil du dernier 
              message, et un composant LastMessage pour afficher le dernier message 
              du chat. Lorsqu'il est cliqué, il redirige l'utilisateur vers la page 
              du chatroom correspondant.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import LastMessage from "./LastMessage";
import { useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";
import { ChatroomProps } from "@/interfaces/interfaces";


const ChatroomItem: React.FC<ChatroomProps> = ({
  name,
  subject,
  last_message,
}) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/chatroom/${name}`);
  }

  return (
    <div
      className="flex grow bg-custom-bg p-3 m-3 border-b-2 border-slate-400/20"
      onClick={handleClick}
    >
      <Avatar img={subject.profile_photo?.path || undefined} rounded size="lg">
        <h2 className="font-inter text-base-text text-2xl text-start">
          {subject.firstname}
        </h2>
        <LastMessage
          last_message={last_message}
          subject_first_name={subject.firstname}
        />
      </Avatar>
    </div>
  );
};

export default ChatroomItem;
