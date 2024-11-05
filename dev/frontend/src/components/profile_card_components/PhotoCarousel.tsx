import React from "react";
import { Carousel } from "flowbite-react";
// import Image from '../../../ressources/avatars/AdobeStock_222851624_Preview.jpeg';
// import Image2 from '../../../ressources/avatars/charlesdeluvio-kVg2DQTAK7c-unsplash.jpg';
// import Image3 from '../../../ressources/avatars/oguz-yagiz-kara-uTlMt9o7SHE-unsplash.jpg';
import unknown_photo from "../../../ressources/avatars/unknown_photo.jpg";

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
        {images.length === 0 && (
          <img
            className="w-full object-cover"
            src={unknown_photo}
            alt="First slide"
          />
        )}
        {images.map((image, index) => (
          <img
            key={image.key}
            className="w-full object-cover"
            src={image.data}
            alt={`Slide ${index}`}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default PhotoCarousel;
