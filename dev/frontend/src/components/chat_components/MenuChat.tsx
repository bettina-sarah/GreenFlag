import React, {useEffect} from 'react';
import IconButton from '../IconButton';
import matchingIcon from '../../ressources/icons/matching.png'
import messageIcon from '../../ressources/icons/messages.png'
import settingsIcon from '../../ressources/icons/settings.png'
import logoutIcon from '../../ressources/icons/logout.png'
import useFetch from '@/api/useFetch';

interface MenuChatProp{
    subject_id: number;
}

interface Subject{
    id: string;
}

interface IPhotoData {
    path: string;
    key: string;
  }


const MenuChat: React.FC<MenuChatProp> = ({subject_id}) => {

    const {
        data: subjectData,
        loading: subjectLoading,
        error: subjectError,
        } = useFetch<Subject>({
        url: "//get-profile",
        data: { id: subject_id },
    });

    useEffect(() => {
        if (subjectData && !subjectLoading && !subjectError) {
            const photoKeys = subjectData?.user_infos?.photo_keys;


        }
    }, [subjectData, subjectLoading, subjectError, subject_id]);

    return(
        <div className='w-full h-50'>
            <div className='flex w-full h-full justify-evenly  bg-greenflag-green'>
            <IconButton icon={matchingIcon} page="matching"/>
            <IconButton icon={messageIcon} page="chatrooms"/>
            <IconButton icon={settingsIcon} page="settings"/>
            <IconButton icon={logoutIcon} page="login"/>
            </div> 
        </div>
    );

};

export default MenuChat;