import React, { useEffect } from "react";
// import Image from '../../../ressources/avatars/AdobeStock_222851624_Preview.jpeg';
// import Image2 from '../../../ressources/avatars/charlesdeluvio-kVg2DQTAK7c-unsplash.jpg';
// import Image3 from '../../../ressources/avatars/oguz-yagiz-kara-uTlMt9o7SHE-unsplash.jpg';
import unknown_photo from "../../../ressources/avatars/unknown_photo.jpg";
// import Image from "../Image";
import { Carousel } from "flowbite-react";
// import useFetch from "@/api/useFetch";
import fetchData from "@/api/fetchData";

interface CarouselProps {
  images: string[] | null;
}

interface IPhotoData {
  path: string;
  key: string;
}

const PhotoCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [photoData, setPhotoData] = React.useState<IPhotoData[]>([]);

  useEffect(() => {
    if (images && images.length > 0) {
      const fetchPhotos = async () => {
        try {
          const fetchedPhotos: IPhotoData[] = await Promise.all(
            images.map(async (key: string) => {
              const photo = await fetchData<IPhotoData>("/get-photo", key);
              return { key, path: photo.path };
            })
          );
          setPhotoData(fetchedPhotos);
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      };
      fetchPhotos();
    } else {
      setPhotoData([]);
    }
  }, []); //[profileData, profileLoading, profileError]

  if (!images || images.length === 0) {
    return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slide={false}>
          <img
            className="w-full object-cover"
            src={unknown_photo}
            alt="First slide"
          />
          <img
            className="w-full object-cover"
            src={unknown_photo}
            alt="unknown"
          />
        </Carousel>
      </div>
    );
  } else if (photoData && photoData.length > 0) {
    return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slide={false}>
          {photoData.map((image) => (
            <img
              key={image.key}
              className="w-full object-cover"
              src={image.path}
              alt="unknown"
            />
          ))}
        </Carousel>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
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
//
