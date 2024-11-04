import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatroomList = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch chatroom list from the backend
    fetch('/chatrooms')
      .then(response => response.json())
      .then(data => setChatrooms(data));
  }, []);

  const openChatroom = (chatroomId:string) => {
    navigate(`/chatroom/${chatroomId}`);
  };

  return (
    <div>
      {chatrooms.map(chatroom => (
        <div key={chatroom.id} onClick={() => openChatroom(chatroom.id)}>
          <img src={chatroom.profilePhoto} alt="Profile" />
          <p>{chatroom.lastMessage}</p>
        </div>
      ))}
    </div>
  );
};