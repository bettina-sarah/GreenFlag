import React from "react";
import QuestionnaireForm from "@/components/QuestionnaireForm";

const Questionnaire: React.FC = () => (
    <div className='w-full h-full flex flex-col justify-between items-center'>
        <h1>Questionnaire</h1>
        <QuestionnaireForm />
    </div>
)

export default Questionnaire