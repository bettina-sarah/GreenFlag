import React from "react";
interface MessageProps {
  content: string;
  sender_id: number;
}

const MessageComponent: React.FC<MessageProps> = ({ content, sender_id }) => {
  currentUserId = 

  return (
    <li className={`flex ${sender_id === currentUserId ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs p-3 rounded-xl text-white ${sender_id === currentUserId ? 'bg-blue-500' : 'bg-gray-300 text-black'}`}
      >
        {content}
      </div>
    </li>
  );
};