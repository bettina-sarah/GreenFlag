import React from "react";
interface MessageProps {
  content: string;
  sender_id: number;
}

const Message: React.FC<MessageProps> = ({ content, sender_id }) => {
  const currentUserId = sessionStorage.getItem('id') ? Number(sessionStorage.getItem('id')) : 0;
  return (
    <li className={`flex ${sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs text-left text-wrap break-words p-2 mt-2 mx-3 rounded-2xl text-white ${sender_id === currentUserId ? 'bg-primary-color' : 'bg-secondary-color text-white'}`}
      >
        <p>{content}</p>
      </div>
    </li>
  );
};

  export default Message;