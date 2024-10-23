import React from 'react';
import MatchingIcon from './Icon';

const IconButton: React.FC = (icon) => (
	<button className='w-10 h-10 flex items-center justify-center p-1 border-none bg-green-600
     hover:ring-offset-purple-800 transition-opacity'>
        <MatchingIcon icon={icon} />
    </button>
);

export default IconButton;