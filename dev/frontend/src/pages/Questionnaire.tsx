import React from 'react';
// import { Link } from 'react-router-dom';
import QuestionnaireForm from '@/components/QuestionnaireForm';

const QuestionnairePage: React.FC = () => (
	<div className='w-full h-full flex flex-col justify-between items-center'>
		<h1 className='text-3xl font-bold text-teal-500'>Questionnaire</h1>
		<div className='flex flex-col m-2 py-3'>
            <QuestionnaireForm />
		</div>
	</div>
);

export default QuestionnairePage;