import React, {useEffect,useState} from 'react';
import IconButton from '../IconButton';
import backIcon from '../../../ressources/icons/back_arrow.png';
import flagButton from '../../../ressources/icons/FlagButton_left.png';
import useFetch from '@/api/useFetch';
import { Avatar } from 'flowbite-react';
import { ProfileProps } from '@/pages/MatchingPage';
import { IPhotoData } from '../profile_card_components/PhotoCarousel';
import fetchData from '@/api/fetchData';

interface MenuChatProp{
    subject_id: number;
}

const MenuChat: React.FC<MenuChatProp> = ({subject_id}) => {

    const {
        data: subjectData,
        loading: subjectLoading,
        error: subjectError,
        } = useFetch<ProfileProps>({
        url: "//get-profile",
        data: { id: subject_id },
    });

    const [avatarPhoto,setAvatarPhoto] = useState<IPhotoData>()

    useEffect(() => {
        if (subjectData && !subjectLoading && !subjectError) {
            const photoKeys = subjectData?.;
            if(photoKeys){ 
                const fetchPhoto = async () => {
                    const photo = await fetchData<IPhotoData>("/get-photo", photoKeys[0]);
                    console.log(photo)
                    setAvatarPhoto({key: photoKeys[0], path: photo.path });
                }
                fetchPhoto()
            }
        }
    }, [subjectData, subjectLoading, subjectError]);

    return(
        <div className='w-full h-50'>
            <div className='flex w-full h-full justify-evenly  bg-greenflag-green'>
                <IconButton icon={backIcon} page="chatrooms"/>
                <Avatar img={avatarPhoto?.path || undefined}/>
                <h1>{subjectData?.profile_info?.basic_info?.first_name}</h1>
                {/* <IconButton icon={flagButton}  onClick={}/> */}
            </div> 
        </div>
    );

};

export default MenuChat;