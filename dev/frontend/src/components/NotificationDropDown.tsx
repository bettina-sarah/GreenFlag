import { Dropdown } from "flowbite-react";
import bellIcon from "../../ressources/icons/bell_notification.png";
import IconButton from "./IconButton";

const NotificationDropDown: React.FC = () => {
  return (
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
  );
};

export default NotificationDropDown;
