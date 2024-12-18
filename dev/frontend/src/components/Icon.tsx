import { IconProps } from "@/interfaces/interfaces";

const Icon: React.FC<IconProps> = ({icon}) => (
    <img src={icon} alt="Icon" className='object-contain w-full h-full p-0'  />
);

export default Icon;