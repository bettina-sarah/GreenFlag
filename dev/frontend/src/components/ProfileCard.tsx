import React from 'react';
import PhotoCarousel from './profile_card_components/PhotoCarousel';
import BasicInfo from './profile_card_components/BasicInfo';
import RelationshipGoals from './profile_card_components/RelationshipGoals';
import Hobbies from './profile_card_components/Hobbies';
import Bio from './profile_card_components/Bio';


    
interface ProfileProps {
    user: {
        basic_info: {
            firstname: string,
            age: number,
            city: string,
            location: number
        },
        relationship: string,
        wants_kids: boolean,
        hobby_array: string[],
        bio: string
    }
    // photos: ImageBitmap[]
    // hobby_array: string[]
    // bio: string
}


const ProfileCard: React.FC<ProfileProps> = ({user}) => {

    return(
	<div className='w-96 bg-greenflag-green p-1 rounded'>
        <PhotoCarousel/>
        <BasicInfo basic_info={user.basic_info}/>
        <RelationshipGoals relationship={user.relationship} wants_kids={user.wants_kids}/>
        <Hobbies hobbies={user.hobby_array}/>
        <Bio bio={user.bio}/>
        
	</div>
    );
};

export default ProfileCard;