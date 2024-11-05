
interface IconProps {
    icon: string;
}

const Icon: React.FC<IconProps> = ({icon}) => (
    <img src={icon} alt="Icon" className='object-cover w-full h-full p-0'  /> // object-contain
);

export default Icon;