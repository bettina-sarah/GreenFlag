import React from "react";
import { Emoji } from "react-emoji-render";

interface RelationshipProps {
  relationship: string;
  wants_kids: boolean;
}

const RelationshipGoals: React.FC<RelationshipProps> = ({
  relationship,
  wants_kids,
}) => {
  return (
    <div className="flex flex-col items-baseline pl-4 pt-1">
      <h2 className="font-nunito-bold text-h2-custom">Relationship Goals</h2>
      <div className="flex flex-wrap">
        <div className="font-nunito-semibold p-1 m-1 px-3 border-[2px] border-slate-700 bg-complementary-color rounded-3xl text-muted-text ">
          {relationship} 💕
        </div>

        <div className="font-nunito-semibold p-1 px-3 m-1 border-[2px] border-slate-700 bg-complementary-color rounded-3xl text-muted-text ">
          {wants_kids ? "Wants kids 🍼" : "Doesn't want kids ❌"}
        </div>
      </div>
    </div>
  );
};

export default RelationshipGoals;
