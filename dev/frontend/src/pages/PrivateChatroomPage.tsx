import React from 'react';
import Chat from '@/components/Chat';
import { useParams } from 'react-router-dom';
import MenuChat from '@/components/chat_components/MenuChat';


const PrivateChatroomPage: React.FC = () => {
    const {subject_id} = useParams();

    return (
        <div>
            <MenuChat subject_id={Number(subject_id)} />
            <Chat />
        </div>
    );
};

export default PrivateChatroomPage;