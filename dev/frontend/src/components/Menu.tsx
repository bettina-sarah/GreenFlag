import React from 'react';
import {IconButton} from '@primer/react'

const Menu: React.FC = () => (
	<div>
        {/* 	'default' | 'primary' | 'danger' | 'outline' | 'invisible' | 'link' */}
		<IconButton icon={HeartIcon} variant="primary" aria-label="Favorite" size='medium'/>
	</div>
);

export default Menu;