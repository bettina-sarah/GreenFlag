// import matchingIcon from '../../ressources/icons/matching.png'


const MatchingIcon: React.FC = (icon) => (
    <img src={icon} alt="Matching Icon" className='object-contain w-full h-full p-0'  />
);
// style={{ width: '50vh', height: '40vh' }}

export default MatchingIcon;



To make your MatchingIcon component generic and pass the icon as a prop from the Menu component, you'll need to adjust a few things in your code. Here’s how you can do that step by step:

1. Update IconButton Component
Change the props to accept an icon as a prop and destructure it properly:

jsx
Copier le code
import React from 'react';
import MatchingIcon from './Icon';

interface IconButtonProps {
    icon: string; // or you can use 'string | undefined' if you want to allow for optional icons
}

const IconButton: React.FC<IconButtonProps> = ({ icon }) => (
    <button className='w-10 h-10 flex items-center justify-center p-1 border-none bg-green-600 hover:ring-offset-purple-800 transition-opacity'>
        <MatchingIcon icon={icon} />
    </button>
);

export default IconButton;
2. Update MatchingIcon Component
Similarly, update the MatchingIcon to accept the icon prop correctly:

jsx
Copier le code
import React from 'react';

interface MatchingIconProps {
    icon: string; // or 'string | undefined'
}

const MatchingIcon: React.FC<MatchingIconProps> = ({ icon }) => (
    <img src={icon} alt="Matching Icon" className='object-contain w-full h-full p-0' />
);

export default MatchingIcon;
3. Update the Menu Component
Now, pass the matchingIcon prop to IconButton:

jsx
Copier le code
import React from 'react';
import IconButton from './IconButton';
import matchingIcon from '../../ressources/icons/matching.png';

const Menu: React.FC = () => (
    <div className='w-full h-full'>
        <div className='flex w-full h-full justify-evenly bg-green-600'>
            <IconButton icon={matchingIcon} />
            <IconButton icon={matchingIcon} />
            <IconButton icon={matchingIcon} />
            <IconButton icon={matchingIcon} />
            <IconButton icon={matchingIcon} />
        </div>
    </div>
);

export default Menu;
Summary of Changes
Prop Types: Ensure you're using TypeScript to define the props for each component properly.
Destructuring: Make sure to destructure the icon prop in both the IconButton and MatchingIcon components.
Usage: Pass the icon path as a prop from the Menu component.
Final Thoughts
With these changes, you should be able to pass the matchingIcon (or any other icon you import) to the IconButton component, which then passes it down to the MatchingIcon. This makes your components more reusable and flexible!