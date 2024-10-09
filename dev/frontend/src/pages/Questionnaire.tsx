import React from 'react';
// import { Link } from 'react-router-dom';
import QuestionnaireForm from '@/components/QuestionnaireForm';

const QuestionnairePage: React.FC = () => (
	<div className='flex-grow-1 flex flex-col justify-evenly items-center'>
		<h1 className='text-3xl font-bold text-teal-500'>Questionnaire</h1>
    <QuestionnaireForm />
	</div>
);

export default QuestionnairePage;