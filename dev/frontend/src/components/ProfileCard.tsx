import React from 'react';
import PhotoCarousel from './profile_card_components/PhotoCarousel';
import BasicInfo from './profile_card_components/BasicInfo';
import Hobbies from './profile_card_components/Hobbies';

const ProfileCard: React.FC = () => {

    return(
	<div className='w-96 bg-greenflag-green p-1 rounded'>
        <PhotoCarousel/>
        <BasicInfo/>
        <Hobbies/>
        
        <div>Bio wrapper
            <h2>Bio</h2>
            <div>about me</div>
        </div>
        
	</div>
    );
};

export default ProfileCard;