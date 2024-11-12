import React from 'react';
import Chat from '@/components/Chat';
import MenuChat from '@/components/chat_components/MenuChat';


const PrivateChatroomPage: React.FC = () => {
    return (
        <div>
            <MenuChat />
            <Chat />
        </div>
    );
};

export default PrivateChatroomPage;