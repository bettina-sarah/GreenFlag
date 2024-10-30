import React from 'react';
import { Carousel } from "flowbite-react";
// import Image from '../../../ressources/avatars/AdobeStock_222851624_Preview.jpeg';
// import Image2 from '../../../ressources/avatars/charlesdeluvio-kVg2DQTAK7c-unsplash.jpg';
// import Image3 from '../../../ressources/avatars/oguz-yagiz-kara-uTlMt9o7SHE-unsplash.jpg';

interface IPhotoData {
  key: string; // Unique identifier or key for the image
  data: string; // Assuming Base64 or URL string for simplicity
  }
  
  interface CarouselProps {
    images: IPhotoData[]; // List of images
  }

const PhotoCarousel: React.FC<CarouselProps> = ({ images }) => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slide={false}>
            {images.map((image, index) => (
          <img
            key={image.key}
            className="w-full object-cover"
            src={image.data}
            alt={`Slide ${index}`}
          />
        ))}
                {/* <img className="w-full object-cover" src={Image} alt="First slide" />
            <img className="w-full object-cover" src={Image2} alt="Second slide" />
            <img className="w-full object-cover" src={Image3} alt="Third slide" />
            <img className="w-full object-cover" src={Image} alt="First slide" />
            <img className="w-full object-cover" src={Image2} alt="Second slide" />
            <img className="w-full object-cover" src={Image3} alt="Third slide" /> */}
            </Carousel>
        </div>
    );
}

export default PhotoCarousel;