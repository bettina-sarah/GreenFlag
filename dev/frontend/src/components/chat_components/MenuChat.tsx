import React, {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../IconButton';
import backIcon from '../../../ressources/icons/back_arrow.png';
import flagButton from '../../../ressources/icons/FlagButton_left.png';
import useFetch from '@/api/useFetch';
import { Avatar } from 'flowbite-react';
import { IPhotoData } from '../profile_card_components/PhotoCarousel';
import fetchData from '@/api/fetchData';
import FlagModal from './FlagModal';

interface SubjectInfos{
    subject_id: number;
    subject_firstname: string;
    subject_avatar: string | null;
}

const MenuChat: React.FC = () => {
    const {chatroom_name} = useParams();
    const currentUserId = sessionStorage.getItem('id');
    
    const {
        data: subjectData,
        loading: subjectLoading,
        error: subjectError,
        } = useFetch<SubjectInfos>({
        url: "//get-chatroom-subject",
        data: { chatroom_name: chatroom_name, id: currentUserId },
    });

    const [avatarPhoto,setAvatarPhoto] = useState<IPhotoData>()
    const [isFlagModalOpen, setIsFlagModalOpen] = useState<boolean>(false)

    useEffect(() => {
        if (subjectData && !subjectLoading && !subjectError) {
            const photoKey = subjectData?.subject_avatar;
            if(photoKey){ 
                const fetchPhoto = async () => {
                    const photo = await fetchData<IPhotoData>("/get-photo", photoKey[0]);
                    console.log(photo)
                    setAvatarPhoto({key: photoKey[0], path: photo.path });
                }
                fetchPhoto()
            }
        }
    }, [subjectData, subjectLoading, subjectError]);

    return(
        <div className='w-full h-50'>
            <div className='flex w-full h-full justify-between  bg-primary-color'>
                <div>
                    <IconButton icon={backIcon} page="chatrooms"/>
                </div>
                <div className='flex w-50 items-center'>
                    <Avatar key={avatarPhoto?.key} img={avatarPhoto?.path || undefined} rounded/>
                    <h1 className='pl-2 text-base-text text-2xl'>{subjectData?.subject_firstname}</h1>
                </div>
                <IconButton icon={flagButton}  onClick={() =>setIsFlagModalOpen(true)}/>
            </div>
            <FlagModal 
                subject_id={subjectData?.subject_id}
                isOpen={isFlagModalOpen}
                onClose={() => setIsFlagModalOpen(false)}
            />
        </div>
    );

};

export default MenuChat;