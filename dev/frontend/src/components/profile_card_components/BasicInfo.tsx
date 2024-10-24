import React from 'react';


const BasicInfo: React.FC = () => {

    return (
<div className="flex flex-col items-baseline pl-4 pt-1">
  <h1 className="font-nunito-extrabold text-h1-yellow ">Lucas, 33</h1>
  <h2 className="font-nunito-bold text-blue-100">Photographer</h2>
  <h2 className="font-nunito-bold text-blue-100">10 km away</h2>
</div>

    );
};

export default BasicInfo;
