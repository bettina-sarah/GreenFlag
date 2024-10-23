import React from 'react';
import MatchingIcon from './Icon';
interface IconButtonProps {
    icon: string; // or you can use 'string | undefined' if you want to allow for optional icons
}

const IconButton: React.FC<IconButtonProps> = ({icon}) => (
	<button className='w-10 h-12 flex items-center justify-center p-1 border-none bg-green-600
    hover:bg-green-900 rounded'>
        <MatchingIcon icon={icon} />
    </button>
);

export default IconButton;