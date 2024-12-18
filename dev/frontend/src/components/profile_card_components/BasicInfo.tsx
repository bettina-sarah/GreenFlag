import useFetch from "@/api/useFetch";
import React from "react";

interface BasicInfoProps {
  basic_info: {
    first_name: string;
    age: number;
    city: string;
  };
  suggestion_id: string;
}

interface LocationData {
  location: string;
  }



const BasicInfo: React.FC<BasicInfoProps> = ({ basic_info, suggestion_id }) => {


  const {
    data: locationData,
    loading: locationLoading,
    error: locationError,
  } = useFetch<LocationData>({
    url: "/get-location",
    data: { id: sessionStorage.getItem("id"), suggestion_id: suggestion_id },
  });

  if (!locationData && locationLoading) {
    return <div>Loading...</div>;
  }

  if (!locationData && !locationLoading && locationError) {
    return (
      <div>
        <div>Error: {locationError}</div>
      </div>
    );
  }
console.log('location:',locationData, locationData[0], locationData[0][0])
  const distance = locationData?.[0][0] ?? 0;


  return (
    <div className="flex flex-col items-baseline pl-4 pt-1 mt-2 mb-2">
      <h1 className="font-nunito-extrabold text-h1-custom mb-1 ">
        {basic_info.first_name}, {basic_info.age}
      </h1>
      <h2 className="font-nunito-semibold text-muted-text">
        Lives in {basic_info.city}
      </h2>
      <h2 className="font-nunito-semibold text-muted-text">
        {distance} km away
      </h2>
    </div>
  );
};

export default BasicInfo;
