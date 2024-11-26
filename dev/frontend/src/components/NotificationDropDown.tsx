// import { Dropdown } from "flowbite-react";
// import bellIcon from "../../ressources/icons/bell_notification.png";
// import IconButton from "./IconButton";

// const NotificationDropDown: React.FC = () => {
//   return (
//     <Dropdown inline label={<IconButton icon={bellIcon} />}>
//       <Dropdown.Item onClick={() => alert("Dashboard!")}>
//         You have a new message from Jane
//       </Dropdown.Item>
//       <Dropdown.Item>Settings</Dropdown.Item>
//       <Dropdown.Item>Earnings</Dropdown.Item>
//       <Dropdown.Divider />
//       <Dropdown.Item>Sign out</Dropdown.Item>
//       <Dropdown.Item as="a" href="https://flowbite.com/" target="_blank">
//         External link
//       </Dropdown.Item>
//     </Dropdown>
//   );
// };

// export default NotificationDropDown;





import { useState, useEffect } from 'react';
import IconButton from './IconButton';
import bellIcon from "../../ressources/icons/bell_notification.png";
import PaletteIcon from '@/../ressources/icons/palette_bold_icon_white.png'

const NotificationDropDown = () => {
  // const [theme, setTheme] = useState(localStorage.getItem('theme') || 'theme-emerald');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // // Change theme dynamically
  // const changeTheme = (newTheme:string) => {
  //   setTheme(newTheme);
  //   localStorage.setItem('theme', newTheme); // Save selected theme in localStorage
  //   setIsOpen(false);
  // };

  // useEffect(() => {
  //   document.documentElement.classList.remove('theme-emerald', 'theme-autumn', 'theme-orange', 'theme-blue', 'theme-green');
  //   document.documentElement.classList.add(theme);
  // }, [theme]);

  return (
    <div className="relative pt-1">
      
      <IconButton icon={bellIcon} onClick={()=> setIsOpen(!isOpen)}/>

      {/* <button className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none" onClick={()=> setIsOpen(!isOpen)}>
        Select Theme
      </button> */}

      {isOpen && (
      <div className="flex absolute w-60 mt-2 bg-primary-color rounded-md shadow-lg z-10 left-1/2 transform -translate-x-1/2">
        <ul className='space-y-2 p-2'>
          <li>
            <button
              className="w-full p-2 text-black text-sm hover:bg-theme-emerald/50 rounded"

            >
              You have a new message from Jane
            </button>
          </li>
          <li>
            <div className="w-100 p-1 bg-slate-300 rounded">

            </div>
          </li>
          <li>
            <button
              className="w-full p-2 text-black text-sm hover:bg-theme-autumn/50 rounded-md"

            >
              You have a new message from Jane
            </button>
          </li>
          {/* <li>
            <button
              className="w-full p-2 bg-theme-orange text-black hover:bg-theme-orange/50 rounded-md"

            >
              Orange
            </button>
          </li>
          <li>
            <button
              className="w-full p-2 bg-theme-blue text-black hover:bg-theme-blue/50 rounded-md"

            >
              Ocean
            </button>
          </li>
          <li>
            <button
              className="w-full p-2 bg-theme-green text-black hover:bg-theme-green/50 rounded-md"

            >
              Forest
            </button>
          </li> */}
        </ul>
      </div>
      )}
    </div>
  );
};

export default NotificationDropDown;

