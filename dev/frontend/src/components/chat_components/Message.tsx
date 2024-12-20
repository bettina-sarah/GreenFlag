/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : Message.tsx
Created By  : Vincent Fournier
About       : Le composant Message affiche un message avec un style conditionnel
              selon qu'il provient de l'utilisateur actuel ou de l'interlocuteur, 
              en se basant sur l'ID de l'expéditeur.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import { MessageProps } from "@/interfaces/interfaces";

const Message: React.FC<MessageProps> = ({ content, sender_id }) => {
  const currentUserId = sessionStorage.getItem('id') ? Number(sessionStorage.getItem('id')) : 0;
  return (
    <li className={`flex ${sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs text-left text-wrap break-words py-2 px-3 mt-2 mx-3 rounded-3xl text-white ${sender_id === currentUserId ? 'bg-primary-color' : 'bg-secondary-color text-white'}`}
      >
        <p>{content}</p>
      </div>
    </li>
  );
};

  export default Message;