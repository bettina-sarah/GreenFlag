import React from "react";
import { BasicInfoProps } from "@/interfaces/interfaces";

const BasicInfo: React.FC<BasicInfoProps> = ({ basic_info }) => {
  return (
    <div className="flex flex-col items-baseline pl-4 pt-1 mt-2 mb-2">
      <h1 className="font-nunito-extrabold text-h1-custom mb-1 ">
        {basic_info.first_name}, {basic_info.age}
      </h1>
      <h2 className="font-nunito-semibold text-muted-text">
        Lives in {basic_info.city}
      </h2>
      <h2 className="font-nunito-semibold text-muted-text">
        {basic_info.location} km away
      </h2>
    </div>
  );
};

export default BasicInfo;
