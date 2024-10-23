import React from 'react';
import IconButton from './IconButton';
import matchingIcon from '../../ressources/icons/matching.png'

{/* <Button><Horizontal><Icon icon={icon} /><P>Label</P></Horizontal></Button> */}

const Menu: React.FC = () => (
    <div className='w-full h-full'>
       	<div className='flex w-full h-full justify-evenly  bg-green-600'>
        <IconButton icon={matchingIcon}/>
        <IconButton/>
        <IconButton/>
        <IconButton/>
        <IconButton/>
	</div> 
    </div>

);

export default Menu;

