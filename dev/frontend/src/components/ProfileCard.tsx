import React from 'react';
import PhotoCarousel from './profile_card_components/PhotoCarousel';
import BasicInfo from './profile_card_components/BasicInfo';
import Hobbies from './profile_card_components/Hobbies';
import Bio from './profile_card_components/Bio';

const hobby_array = ['Hiking','Yoga','Photography','Cooking','Traveling'];
const bio = "Blabla Me. I blabla when i want to have fun. i am blabla blablabla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus risus  dolor, varius a lectus quis, tincidunt sagittis ante. Vivamus tempor."

// interface ProfileProps {
//     photos: ImageBitmap[]
//     hobby_array: string[]
//     bio: string
// }


const ProfileCard: React.FC = () => {

    return(
	<div className='w-96 bg-greenflag-green p-1 rounded'>
        <PhotoCarousel/>
        <BasicInfo/>
        <Hobbies hobbies={hobby_array}/>
        <Bio bio={bio}/>

        

        
	</div>
    );
};

export default ProfileCard;