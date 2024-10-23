import React from 'react';
import Icon from './Icon';
import { useNavigate } from 'react-router-dom';
interface IconButtonProps {
    icon: string; 
    page: string;}



const IconButton: React.FC<IconButtonProps> = ({icon, page}) => {
    const navigate = useNavigate();

    const handleClick = (place:string) => {
        navigate(`/${place}`);
    };
return(
	<button className='w-10 h-12 flex items-center justify-center p-1 border-none bg-green-600
    hover:bg-green-900 rounded' onClick={() => handleClick(page)}>
        <Icon icon={icon} />
    </button>
    );    
};

export default IconButton;