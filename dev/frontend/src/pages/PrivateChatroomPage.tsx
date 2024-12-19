/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : PrivateChatroomPage.tsx
Created By  : Vincent Fournier
About       : Le composant PrivateChatroomPage facilite le messagerie en temps réel 
              dans un chatroom spécifique. Il se connecte à un serveur via Socket.IO, 
              récupère les messages anciens en utilisant un hook personnalisé, et 
              permet aux utilisateurs d'envoyer de nouveaux messages. Le composant 
              utilise un conteneur de chat défilable pour afficher les messages et 
              fournit une zone de texte pour la saisie des messages avec un bouton 
              associé pour envoyer les messages. Les messages sont automatiquement 
              défilés jusqu'en bas pour afficher les messages les plus récents.
====================================================================================
------------------------------------------------------------------------------------
*/

import useFetch from "@/api/useFetch";
import React, {useState, useEffect, useRef} from "react";
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Message from "@/components/chat_components/Message"
import { Textarea } from "flowbite-react";
import IconButton from "@/components/IconButton";
import sendIcon from "@/../ressources/icons/send.png"
import MenuChat from '@/components/chat_components/MenuChat';
import { IOldMessage, IMessage } from "@/interfaces/interfaces";


const PrivateChatroomPage: React.FC = () => {
    const {chatroom_name} = useParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage,setNewMessage] = useState<string>('');
    const [firstLoad, setfirstLoad] = useState<boolean>(true);
    const currentUserId = sessionStorage.getItem('id') ? Number(sessionStorage.getItem('id')) : 0;
    
    const socket = io('http://localhost:5000');

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const {
      data: messageData,
      loading: messageLoading,
      error: messageError,
      } = useFetch<IOldMessage[]>({
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
    
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
      if (newMessage.trim() !== "") {
        socket.emit('message', { chatroom_name, message: newMessage, sender_id: currentUserId });
        setMessages((prevMessages) => [
          ...prevMessages,
          { message_content: newMessage, sender_id: currentUserId}
        ]);
        console.log(messages)
        setNewMessage('');
      }
    };

    return (
      <div className="flex flex-col h-screen">
        <MenuChat />
        <div ref={chatContainerRef} className="flex-grow overflow-y-auto scroll-smooth">
          {messages.map((msg, index) => (
            <Message key={index} content={msg.message_content} sender_id={msg.sender_id}/>
          ))}
        </div>
        <div className="relative p-4">
          <Textarea
            className="bg-primary-color resize-none overflow-y-auto no-scrollbar border border-secondary-color rounded p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-11 max-h-32"
            rows={1}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Type a message"
            onKeyDown={(e)=>{ // https://www.geeksforgeeks.org/how-to-get-the-enter-key-in-reactjs/
              if (e.key === "Enter"){
                e.preventDefault()
                sendMessage()
              }
            }}
          />
          <IconButton className="absolute right-4 bottom-3" onClick={sendMessage} icon={sendIcon} />
        </div>
      </div>
    );
};

export default PrivateChatroomPage;