import { useState, useEffect } from 'react';
import IconButton from './IconButton';
import bellIcon from "../../ressources/icons/bell_notification.png";
import { useNavigate } from 'react-router-dom';

interface NotificationDropDownProps {
  notifications: { chatroom: string, notification: string; }[] | null;
}


const NotificationDropDown: React.FC<NotificationDropDownProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

const navigate = useNavigate();

console.log('notificationDropDown:', notifications)

  return (
    <div className="relative pt-1">
      
      <IconButton icon={bellIcon} onClick={()=> setIsOpen(!isOpen)}/>

      {isOpen && (
      <div className="flex absolute w-60 mt-2 bg-primary-color rounded-md shadow-lg z-10 left-1/2 transform -translate-x-1/2">
        <ul className='space-y-2 p-2'>
          
        {notifications?.map((notificationItem, index) => (
              <li key={index}>
                <button
                  className="w-full p-2 text-black text-sm hover:bg-theme-autumn/50 rounded-md"
                  onClick={() => {
                    navigate(`/chatroom/${notificationItem.chatroom}`);
                  }}
                >
                  {notificationItem.notification}
                </button>
              </li>
            ))}
        </ul>
      </div>
      )}
    </div>
  );
};

export default NotificationDropDown;

