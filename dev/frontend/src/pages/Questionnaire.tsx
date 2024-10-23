import React from 'react';
// import { Link } from 'react-router-dom';
import QuestionnaireForm from '@/components/form_components/QuestionnaireForm';
// import { ThemeProvider } from 'react-admin';


const QuestionnairePage: React.FC = () => {

	
	return	(
		<div className='flex-grow-1 flex flex-col justify-evenly items-center'>
			<h1 className='text-3xl font-bold text-teal-500'>Questionnaire</h1>
			<QuestionnaireForm />
		</div>
	)
}
export default QuestionnairePage;