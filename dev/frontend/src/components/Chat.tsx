import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chatroom = () => {
  const { chatroomId } = useParams();
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    // Fetch previous messages for the chatroom
    fetch(`/api/chatrooms/${chatroomId}/messages`)
      .then(response => response.json())
      .then(data => setMessages(data));

    // Join chatroom through WebSocket
    socket.emit('joinRoom', chatroomId);

    // Listen for incoming messages
    socket.on('message', (message:any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');  // Clean up listener on unmount
    };
  }, [chatroomId]);

  const sendMessage = () => {
    socket.emit('message', { chatroomId, message: newMessage });
    setNewMessage('');
  };

  return (
    <div>
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
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