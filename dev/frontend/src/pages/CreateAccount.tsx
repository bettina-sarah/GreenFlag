import React from 'react';
import RegisterForm from '@/components/RegisterForm';

const CreateAccount: React.FC = () => (
	<div className='w-full h-full flex flex-col justify-between items-center'>
		<h1 className='text-3xl font-bold text-teal-500'>Create Account</h1>
		<div className='flex flex-col m-2 py-3'>
			<RegisterForm />
		</div>
	</div>
);

export default CreateAccount;