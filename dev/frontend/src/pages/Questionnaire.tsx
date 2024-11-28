import React from "react";
// import Menu from "@/components/Menu";
import QuestionnaireForm from "@/components/form_components/QuestionnaireForm";

const QuestionnairePage: React.FC = () => {
  return (
    <div className="flex-grow-1 flex flex-col justify-evenly items-center">
      <h1 className="m-5 text-4xl font-bold text-base-text font-leckerli">Questionnaire</h1>
      <QuestionnaireForm />
    </div>
  );
};
export default QuestionnairePage;
