import IconButton from '@/components/IconButton';
import LoginForm from '@/components/LoginForm';
import React from 'react';
import { useState } from 'react';
import BackArrowIcon from "@/../ressources/icons/back_arrow.png";


const Login: React.FC = () => {

	const [showAccountCreatedMessage, setshowAccountCreatedMessage] = useState(false);

	 if (localStorage.getItem('accountCreated') === 'true' && !showAccountCreatedMessage) {
		setshowAccountCreatedMessage(true);
		localStorage.removeItem('accountCreated');
		localStorage.setItem('fillQuestionnaire', 'true');
	  }

	return(
	<div className='w-full h-full flex flex-col justify-between items-center bg-home-bg2 bg-cover bg-center'>
		<IconButton icon={BackArrowIcon} page=" " className='place-self-start'/>
		<h1 className='text-5xl font-bold text-h1-darkblue font-leckerli'>Welcome Back!</h1>
		{showAccountCreatedMessage && (
        <div className="alert alert-success">
          Account created successfully! Please log in.
        </div>
      )}
		<div className='flex flex-col mb-20 py-3 w-5/6'>
			<LoginForm />
		</div>
	</div>
	);
};

export default Login;