import React from "react";
import IconButton from "./IconButton";
import matchingIcon from "../../ressources/icons/matching.png";
import messageIcon from "../../ressources/icons/messages.png";
import settingsIcon from "../../ressources/icons/settings.png";
import logoutIcon from "../../ressources/icons/logout.png";
import bellIcon from "../../ressources/icons/bell_notification.png";
import ThemeSelector from "./ThemeSelector";
import { useState } from "react";
import Notification from "./Notification";
import { Dropdown } from "flowbite-react";

const Menu: React.FC = () => {
  // const [isVisible, setIsVisible] = useState(false);

  // const toggleDropdown = () => {
  //   setIsVisible(!isVisible);
  // };

  return (
    <div className="w-full h-50">
      <div className="flex w-full h-full justify-evenly  bg-greenflag-green">
        <IconButton icon={matchingIcon} page="matching" />
        <IconButton icon={messageIcon} page="chatrooms" />
        {/* <ThemeSelector/> */}
        <IconButton icon={settingsIcon} page="settings" />
        <Dropdown inline label={<IconButton icon={bellIcon} />}>
          <Dropdown.Item onClick={() => alert("Dashboard!")}>
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
          <Dropdown.Item as="a" href="https://flowbite.com/" target="_blank">
            External link
          </Dropdown.Item>
        </Dropdown>

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
