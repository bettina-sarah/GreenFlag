import React from "react";
import {formatDate} from '@/lib/utils';

interface LastMessageProps {
    last_message: {
        sender_id: number;
        sender_first_name: string;
        content: string;
        date_sent: string;
      };
  }
  
  const LastMessage: React.FC<LastMessageProps> = ({ last_message }) => {
    return (
      last_message.content === null 
      ? (
        <div className="flex flex-row items-center pl-4">
          <p className="text-sm">Start chat</p>
        </div>)
      : (
        <div className="flex flex-row items-center pl-4">
          <p className="text-sm pr-1"><b>{last_message.sender_first_name}</b>:  </p>
          <p className="text-sm">{last_message.content.length >= 15 ? last_message.content.substring(0,15) + '...' : last_message.content}</p>
          <p className="pl-1 pr-1">·</p>
          <p className="text-sm"> {formatDate(last_message.date_sent)}</p>
        </div>
      )
    );
  };
  
  export default LastMessage;