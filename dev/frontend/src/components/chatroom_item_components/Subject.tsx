import React from "react";
import { Avatar } from "flowbite-react";



interface SubjectProps {
    subject: {
        id:number;
        firstname:string;
        profile_photo:any;
      };
  }
  
  const Subject: React.FC<SubjectProps> = ({ subject }) => {
    return (
      <div className="flex flex-row items-baseline pl-4 pt-1">
        <Avatar img={subject.profile_photo?.path || undefined} rounded/>
      </div>
    );
  };
  
  export default Subject;