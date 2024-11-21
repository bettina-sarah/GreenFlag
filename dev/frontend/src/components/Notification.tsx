import { Dropdown } from "flowbite-react";

const Notification: React.FC = () => {
  return (
    <Dropdown inline dismissOnClick={true}>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
};

export default Notification;
