import useFetch from "@/api/useFetch";
import { userInfo } from "os";
import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');
  
interface Message {
  sender_id: number;
  message_content: string;
}

interface OldMessage {
  sender_id:number; 
  sender_first_name:string;
  message_content:string;
  date_sent:string;
}


  const Chat: React.FC = () => {
    const {chatroom_name} = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage,setNewMessage] = useState<string>('');
    const currentUserId = localStorage.getItem('id') ? Number(localStorage.getItem('id')) : 1;
    
    const {
      data: messageData,
      loading: messageLoading,
      error: messageError,
      } = useFetch<OldMessage[]>({
      url: "//get-chatrooms",
      data: { chatroom_name: chatroom_name },
    });

    

    socket.emit('join_chatroom',{chatroom_name});
    
    socket.on('message', (message: { message_content: string; sender_id: number }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message_content: message.message_content, sender_id: message.sender_id }
      ]);
    });
    
    const sendMessage = () => {
      socket.emit('message', { chatroom_name, message: newMessage, sender_id: currentUserId });

      setMessages((prevMessages) => [
        ...prevMessages,
        { message_content: newMessage, sender_id: currentUserId}
      ]);

      setNewMessage('');
    };

    return (
    <div>
      {messages.map((msg, index) => (
        <p key={index}>{msg.message_content}</p>
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