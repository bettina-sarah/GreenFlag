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
        className={`max-w-xs text-left text-wrap break-words p-3 m-1 rounded-2xl text-white ${sender_id === currentUserId ? 'bg-greenflag-green' : 'bg-cyan-800 text-white'}`}
      >
        <p>{content}</p>
      </div>
    </li>
  );
};

  export default Message;