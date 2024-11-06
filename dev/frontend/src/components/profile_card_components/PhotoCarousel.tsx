import React from "react";
// import Image from '../../../ressources/avatars/AdobeStock_222851624_Preview.jpeg';
// import Image2 from '../../../ressources/avatars/charlesdeluvio-kVg2DQTAK7c-unsplash.jpg';
// import Image3 from '../../../ressources/avatars/oguz-yagiz-kara-uTlMt9o7SHE-unsplash.jpg';
import unknown_photo from "../../../ressources/avatars/unknown_photo.jpg";
import Image from "../Image";
import { Carousel } from "@mantine/carousel";

interface CarouselProps {
  images: string[] | null;
}

const PhotoCarousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {!images ||
          (images.length === 0 && (
            <Carousel.Slide>
              <img
                className="w-full object-cover"
                src={unknown_photo}
                alt="First slide"
              />
            </Carousel.Slide>
          ))}
        {images &&
          images.map((imageKey, index) => (
            <Carousel.Slide key={imageKey}>
              <Image
                key={imageKey}
                className="w-full object-cover"
                imageKey={imageKey}
                altText={`Slide ${index}`}
              />
            </Carousel.Slide>
          ))}
      </Carousel>
    </div>
  );
};

export default PhotoCarousel;

// const PhotoCarousel: React.FC<CarouselProps> = ({ images }) => {
//   return (
//     <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
//       <Carousel slide={false}>
//         {images.length === 0 && (
//           <img
//             className="w-full object-cover"
//             src={unknown_photo}
//             alt="First slide"
//           />
//         )}
//         {images.map((image, index) => (
//           <img
//             key={image.key}
//             className="w-full object-cover"
//             src={image.data}
//             alt={`Slide ${index}`}
//           />
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default PhotoCarousel;
