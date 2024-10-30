import React from 'react';
import { Carousel } from "flowbite-react";
import Image from '../../../ressources/avatars/AdobeStock_222851624_Preview.jpeg';
import Image2 from '../../../ressources/avatars/charlesdeluvio-kVg2DQTAK7c-unsplash.jpg';
import Image3 from '../../../ressources/avatars/oguz-yagiz-kara-uTlMt9o7SHE-unsplash.jpg';


const PhotoCarousel: React.FC = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slide={false}>
                <img className="w-full object-cover" src={Image} alt="First slide" />
            <img className="w-full object-cover" src={Image2} alt="Second slide" />
            <img className="w-full object-cover" src={Image3} alt="Third slide" />
            <img className="w-full object-cover" src={Image} alt="First slide" />
            <img className="w-full object-cover" src={Image2} alt="Second slide" />
            <img className="w-full object-cover" src={Image3} alt="Third slide" />
            </Carousel>
        </div>
    );
}

export default PhotoCarousel;