import { userInfo } from "os";
import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');
  
interface Message {
  content: string;
  sender_id: number;
}



  const Chat: React.FC = () => {
    const {chatroom_name} = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage,setNewMessage] = useState<string>('');
    const currentUserId = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : 0;
    
    socket.emit('join_chatroom',{chatroom_name});
    
    socket.on('message', (message: { content: string; sender_id: number }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: message.content, sender_id: message.sender_id }
      ]);
    });
    
    const sendMessage = () => {
      socket.emit('message', { chatroom_name, message: newMessage, sender_id: currentUserId });

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: newMessage, sender_id: currentUserId}
      ]);

      setNewMessage('');
    };

    return (
    <div>
      {messages.map((msg, index) => (
        <p key={index}>{msg.content}</p>
      ))}
      <input 
        type="text" 
        value={newMessage} 
        onChange={(e) => setNewMessage(e.target.value)} 
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
  };
  
  export default Chat;