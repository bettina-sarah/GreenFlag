import React from 'react';
import IconButton from './IconButton';
import matchingIcon from '../../ressources/icons/matching.png'
import messageIcon from '../../ressources/icons/messages.png'
import settingsIcon from '../../ressources/icons/settings.png'
import logoutIcon from '../../ressources/icons/logout.png'
// import handleClick from Menu


const Menu: React.FC = () => {

    return(
    <div className='w-full h-53'>
       	<div className='flex w-full h-full justify-evenly  bg-greenflag-green'>
        <IconButton icon={matchingIcon} page="matching"/>
        <IconButton icon={messageIcon} page="chatrooms"/>
        <IconButton icon={settingsIcon} page="settings"/>
        <IconButton icon={logoutIcon} page="login"/>
	    </div> 
    </div>
    );

};

export default Menu;

