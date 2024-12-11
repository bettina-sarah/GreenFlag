import {useState} from "react";
import IconButton from "./IconButton";
import { useNavigate } from "react-router-dom";
import settingsIcon from "../../ressources/icons/settings.png";

const SettingsDropDown: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    return (
        <div className="relative pt-1">
            <IconButton
                icon={settingsIcon}
                onClick={() => setIsOpen(!isOpen)}
            />
            
            {isOpen && (
                <div className="flex absolute w-60 mt-2 bg-primary-color rounded-md shadow-lg z-10 left-1/2 transform -translate-x-1/2">
                    <ul className="space-y-2 p-2">
                        <li>
                            <button
                                className="w-full p-2 text-black text-sm rounded-md"
                                onClick={() => navigate('/modify-profile')}
                            >
                                modify profile
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full p-2 text-black text-sm rounded-md"
                                onClick={() => navigate('/account-settings')}
                            >
                                account settings
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full p-2 text-black text-sm rounded-md"
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