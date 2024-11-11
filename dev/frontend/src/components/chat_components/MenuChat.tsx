import React, {useEffect,useState} from 'react';
import IconButton from './IconButton';
import matchingIcon from '../../ressources/icons/matching.png'
import backIcon from '../../../ressources/icons/back_arrow.png'
import useFetch from '@/api/useFetch';
import { Avatar } from 'flowbite-react';

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

    const [photo,setPhoto] = useState<IPhotoData>()

    useEffect(() => {
        if (subjectData && !subjectLoading && !subjectError) {
            const photoKeys = subjectData?.user_infos?.photo_keys;


        }
    }, [subjectData, subjectLoading, subjectError, subject_id]);

    return(
        <div className='w-full h-50'>
            <div className='flex w-full h-full justify-evenly  bg-greenflag-green'>
                <IconButton icon={backIcon} page="chatrooms"/>
                <Avatar img={}/>
            </div> 
        </div>
    );

};

export default MenuChat;