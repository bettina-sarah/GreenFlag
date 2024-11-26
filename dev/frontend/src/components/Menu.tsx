import React from "react";
import IconButton from "./IconButton";
import matchingIcon from "../../ressources/icons/matching.png";
import messageIcon from "../../ressources/icons/messages.png";
import settingsIcon from "../../ressources/icons/settings.png";
import logoutIcon from "../../ressources/icons/logout.png";
// import ThemeSelector from "./ThemeSelector";
import NotificationDropDown from "./NotificationDropDown";

const Menu: React.FC = () => {
  // const [isVisible, setIsVisible] = useState(false);

  // const toggleDropdown = () => {
  //   setIsVisible(!isVisible);
  // };

  return (
    <div className="w-full h-50">
      <div className="flex w-full h-full justify-evenly  bg-primary-color">
        <IconButton icon={matchingIcon} page="matching" />
        <IconButton icon={messageIcon} page="chatrooms" />
        <ThemeSelector/>
        <IconButton icon={settingsIcon} page="settings" />
        <NotificationDropDown />

        <IconButton
          icon={logoutIcon}
          onClick={() => {
            sessionStorage.clear();
            localStorage.clear();
            //function to clear & post to BE 1st then clear
            // post to remove token from database!
          }}
          page="login"
        />
      </div>
    </div>
  );
};

export default Menu;
