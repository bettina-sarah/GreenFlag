import React from "react";
import IconButton from "../IconButton";
import matchingIcon from "../../../ressources/icons/matching.png";
import messageIcon from "../../../ressources/icons/messages.png";
import SettingsDropDown from "./SettingsDropDown";

import ThemeSelector from "./ThemeSelector";
import NotificationDropDown from "./NotificationDropDown";
import { useNotifications } from "../NotificationContext";

const Menu: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <div className="w-full h-14">
      <div className="flex w-full h-full justify-evenly  bg-primary-color">
        <IconButton icon={matchingIcon} page="matching" />
        <IconButton icon={messageIcon} page="chatrooms" />
        <NotificationDropDown notifications={notifications} />
        <ThemeSelector />
        <SettingsDropDown />
      </div>
    </div>
  );
};

export default Menu;
