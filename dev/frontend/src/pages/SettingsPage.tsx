import React from 'react';
import DeleteAccountForm from '@/components/form_components/DeleteAccountForm';
import Menu from '@/components/Menu';
import IconButton from '@/components/IconButton';
import logoutIcon from "../../ressources/icons/logout.png";
import { NotificationProvider } from '@/components/NotificationContext';

const SettingsPage: React.FC = () => {
	return(
	<div className='w-full h-full flex flex-col justify-between items-center'>
		  <NotificationProvider>
        <Menu />
      </NotificationProvider>
		<h1>Logout</h1>
		
        <IconButton
          icon={logoutIcon}
          onClick={() => {
            sessionStorage.clear();
            //function to clear & post to BE 1st then clear
            // post to remove token from database!
          }}
          page="login"
        />
		<h1 className='text-3xl font-bold text-teal-500'>Delete account !</h1>
		<div className='flex flex-col m-2 py-3'>
			<DeleteAccountForm />
		</div>
	</div>
	);
};

export default SettingsPage;