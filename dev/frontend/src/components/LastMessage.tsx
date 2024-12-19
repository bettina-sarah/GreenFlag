/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : LastMessage.tsx
Created By  : Vincent Fournier
About       : Le composant LastMessage affiche le dernier message d'une conversation. 
              Il prend en compte si le message est vide ou non, et formatte 
              l'affichage en affichant le nom de l'expéditeur, le contenu du message 
              (avec une limite de caractères pour une prévisualisation) et la date 
              d'envoi formatée.
====================================================================================
------------------------------------------------------------------------------------
*/

import React from "react";
import { formatDate } from "@/lib/utils";
import { LastMessageProps } from "@/interfaces/interfaces";

const LastMessage: React.FC<LastMessageProps> = ({
  last_message,
  subject_first_name,
}) => {
  return last_message.content === null ? (
    <div className="flex flex-row items-center text-primary-color">
      <p className="text-xl">Start chat</p>
    </div>
  ) : (
    <div className="flex flex-row items-center text-primary-color text-base">
      <p className=" pr-1 text-xl">
        <b>
          {last_message.sender_first_name == subject_first_name
            ? last_message.sender_first_name
            : "You"}
        </b>
        :{" "}
      </p>
      <p className="text-lg">
        {last_message.content.length >= 15
          ? last_message.content.substring(0, 15) + "..."
          : last_message.content}
      </p>
      <p className="pl-1 pr-1">·</p>
      <p className="text-lg"> {formatDate(last_message.date_sent)}</p>
    </div>
  );
};

export default LastMessage;
