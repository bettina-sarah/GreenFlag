import {useState, useEffect, useRef} from "react";
import IconButton from "./IconButton";
import { useNavigate } from "react-router-dom";
import settingsIcon from "../../ressources/icons/settings.png";

const SettingsDropDown: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const componentRef = useRef(null);

    useEffect(()=>{
        const handleClickOutside = (event:any) => {
            if (componentRef.current && !componentRef.current.contains(event.target)){
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown',handleClickOutside);
        document.addEventListener('touchstart',handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    },[]);

    return (
        <div ref={componentRef} className="relative pt-1">
            <IconButton
                icon={settingsIcon}
                onClick={() => setIsOpen(!isOpen)}
            />
            
            {isOpen && (
                <div className="flex absolute w-48 mt-2 bg-primary-color rounded-md shadow-lg z-10 left-1/2 transform -translate-x-full md:-translate-x-1/2">
                    <ul className="w-full space-y-2 p-2">
                        <li>
                            <button
                                className="w-full p-2 text-black text-sm rounded-md hover:bg-theme-autumn/50 shadow-lg"
                                onClick={() => navigate('/modify-profile')}
                            >
                                modify profile
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full p-2 text-black text-sm rounded-md hover:bg-theme-autumn/50 shadow-lg"
                                onClick={() => navigate('/account-settings')}
                            >
                                account settings
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full p-2 text-black text-sm rounded-md hover:bg-theme-autumn/50 shadow-lg"
                                onClick={() => {
                                    sessionStorage.clear();
                                    navigate("/");
                                }}
                            >   
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}

        </div>
    );
};

export default SettingsDropDown;