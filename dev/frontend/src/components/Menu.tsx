import React from 'react';
import IconButton from './IconButton';
import matchingIcon from '../../ressources/icons/matching.png'
import messageIcon from '../../ressources/icons/messages.png'
import settingsIcon from '../../ressources/icons/settings.png'
import logoutIcon from '../../ressources/icons/logout.png'


const Menu: React.FC = () => (
    <div className='w-full h-full'>
       	<div className='flex w-full h-full justify-evenly  bg-green-600'>
        <IconButton icon={matchingIcon}/>
        <IconButton icon={messageIcon}/>
        <IconButton icon={settingsIcon}/>
        <IconButton icon={logoutIcon}/>
	</div> 
    </div>

);

export default Menu;

