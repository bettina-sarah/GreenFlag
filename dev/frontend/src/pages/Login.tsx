import LoginForm from '@/components/LoginForm';
import React from 'react';
// import { Link } from 'react-router-dom';

const Login: React.FC = () => (
	<div className='w-full h-full flex flex-col justify-between items-center'>
		<h1 className='text-3xl font-bold text-teal-500'>Welcome Back !</h1>
		<div className='flex flex-col m-2 py-3'>
			<LoginForm />
		</div>
	</div>
);

export default Login;