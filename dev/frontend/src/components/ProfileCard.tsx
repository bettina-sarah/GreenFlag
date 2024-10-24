import React from 'react';
import PhotoCarousel from './profile_card_components/PhotoCarousel';

const ProfileCard: React.FC = () => {

    return(
	<div>
		<h1>ProfileCard</h1>
        <PhotoCarousel/>

		<div>Carousel photos</div>
        <div>Basic info</div>
        <div>hobby wrapper
            <h2>Hobbies</h2>
            <div>Hobby toasts</div>
        </div>
        <div>Bio wrapper
            <h2>Bio</h2>
            <div>about me</div>
        </div>
        
	</div>
    );
};

export default ProfileCard;