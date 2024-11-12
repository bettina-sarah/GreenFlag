import useFetch from "@/api/useFetch";
import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Message from "@/components/chat_components/Message"
import { Textarea } from "flowbite-react";


  
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
    const [firstLoad, setfirstLoad] = useState<boolean>(true);
    const currentUserId = sessionStorage.getItem('id') ? Number(sessionStorage.getItem('id')) : 0;
    
    const socket = io('http://localhost:5000');

    const {
      data: messageData,
      loading: messageLoading,
      error: messageError,
      } = useFetch<OldMessage[]>({
      url: "//get-messages",
      data: { chatroom_name: chatroom_name },
    });

    useEffect(() => {
		  if (messageData && !messageLoading && !messageError) {
        if (firstLoad) {
          messageData.map( (message) =>{
            setMessages((prevMessages) => [
              ...prevMessages,
              { message_content: message.message_content, sender_id: message.sender_id}
            ]);
          });
          setfirstLoad(false);
        }
		  }

      socket.emit('join_chatroom',{chatroom_name});

      socket.on('message', (message: { message: string; sender_id: number; }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message_content: message.message, sender_id: message.sender_id }
        ]);
      });

      return () => {
        socket.disconnect();
      };
	  }, [messageData, messageLoading, messageError, chatroom_name, firstLoad, socket]);
    


    const sendMessage = () => {
      socket.emit('message', { chatroom_name, message: newMessage, sender_id: currentUserId });
      setMessages((prevMessages) => [
        ...prevMessages,
        { message_content: newMessage, sender_id: currentUserId}
      ]);

      setNewMessage('');
    };

    return (
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto">
          {messages.map((msg, index) => (
            <Message key={index} content={msg.message_content} sender_id={msg.sender_id}/>
          ))}
        </div>
        <div className="p-4">
          <Textarea
            className="bg-greenflag-green"
            rows={3}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Type a message"
            onKeyDown={(e)=>{ // https://www.geeksforgeeks.org/how-to-get-the-enter-key-in-reactjs/
              if (e.key === "Enter")
                sendMessage()
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    );
};
  
  export default Chat;