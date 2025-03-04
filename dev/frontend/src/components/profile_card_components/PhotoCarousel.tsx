/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : PhotoCarousel.tsx
Created By  : Bettina-Sarah Janesch
About       : PhotoCarousel est un composant React qui utilise un carrousel de la 
              bibliothèque flowbite-react pour afficher les photos récupérées à partir 
              d'une API, avec des options pour gérer le chargement et les erreurs.
====================================================================================
------------------------------------------------------------------------------------
*/

import React, { useEffect } from "react";
import unknown_photo from "../../../ressources/avatars/unknown_photo.jpg";
import { Carousel } from "flowbite-react";
import fetchData from "@/api/fetchData";
import { IPhotoData, CarouselProps } from "@/interfaces/interfaces";

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
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 [&>div>div]:!rounded-none">
        <Carousel slide={false}>
          <img
            className="w-full object-cover"
            src={unknown_photo}
            alt="First slide"
          />
        </Carousel>
      </div>
    );
  } else if (photoData && photoData.length > 0) {
    return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 [&>div>div]:!rounded-none">
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
