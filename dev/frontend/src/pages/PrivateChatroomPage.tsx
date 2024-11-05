import React from 'react';
import Menu from '@/components/Menu';
import { useParams } from 'react-router-dom';

const PrivateChatroomPage: React.FC = () => {
    let {chatroom_name} = useParams()
    
    return (

        <div>
            <Menu />
            <Chat />
        </div>
    );
};

export default PrivateChatroomPage;