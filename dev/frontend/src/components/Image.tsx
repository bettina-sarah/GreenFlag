import React from "react";
import useFetch from "@/api/useFetch";

interface ImageProps {
  imageKey: string;
  altText: string;
  className?: string; // className is optional with ? undefined
}

interface IImageData {
  path: string;
  key: string;
}

// interface IPhotoData {
//     key: string; // Unique identifier or key for the image
//     data: string; // Assuming Base64 or URL string for simplicity
//   }

const Image: React.FC<ImageProps> = ({ imageKey, altText, className }) => {
  const { data, loading, error } = useFetch<IImageData>({
    url: "/get-photo",
    data: imageKey,
  }); //IImageData defines interface for fetched data
  // in useFetch, IUSeFetch is for the params

  if (!data && loading) {
    return <div>Loading...</div>;
  }

  if (!data && !loading && error) {
    return (
      <div>
        <div>Error: {error}</div>
      </div>
    );
  }

  if (data && !loading && !error) {
    return (
      <img src={data.path} alt={altText} className={className} /> //"w-full object-cover"
    );
  }
  return <img src="" alt="" />;
};

export default Image;
