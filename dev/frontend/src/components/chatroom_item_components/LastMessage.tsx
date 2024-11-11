import React from "react";

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
        <div className="flex flex-row items-baseline pl-4 pt-1">
          Start chat
        </div>)
      : (
        <div className="flex flex-row items-baseline pl-4 pt-1">
          <p>{last_message.sender_first_name}:</p>
          <p>{last_message.content}</p>
          <p>{last_message.date_sent}</p>
        </div>
      )
    );
  };
  
  export default LastMessage;