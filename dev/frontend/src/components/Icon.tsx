
interface MatchingIconProps {
    icon: string;
}

const MatchingIcon: React.FC<MatchingIconProps> = ({icon}) => (
    <img src={icon} alt="Matching Icon" className='object-contain w-full h-full p-0'  />
);

export default MatchingIcon;