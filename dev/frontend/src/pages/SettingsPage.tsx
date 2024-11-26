import React from 'react';
import DeleteAccountForm from '@/components/form_components/DeleteAccountForm';
import Menu from '@/components/Menu';

const SettingsPage: React.FC = () => (
	<div className='w-full h-full flex flex-col justify-between items-center'>
		<Menu />
		<h1 className='text-3xl font-bold text-teal-500'>Delete account !</h1>
		<div className='flex flex-col m-2 py-3'>
			<DeleteAccountForm />
		</div>
	</div>
);

export default SettingsPage;