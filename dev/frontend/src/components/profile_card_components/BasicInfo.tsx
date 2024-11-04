import React from "react";

interface BasicInfoProps {
  basic_info: {
    first_name: string;
    age: number;
    city: string;
    location: number;
  };
}

const BasicInfo: React.FC<BasicInfoProps> = ({ basic_info }) => {
  return (
    <div className="flex flex-col items-baseline pl-4 pt-1">
      <h1 className="font-nunito-extrabold text-h1-yellow ">
        {basic_info.first_name}, {basic_info.age}
      </h1>
      <h2 className="font-nunito-bold text-blue-100">
        Lives in {basic_info.city}
      </h2>
      <h2 className="font-nunito-bold text-blue-100">
        {basic_info.location} km away
      </h2>
    </div>
  );
};

export default BasicInfo;
