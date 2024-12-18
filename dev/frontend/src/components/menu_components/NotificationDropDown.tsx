import { useState, useEffect, useRef } from "react";
import IconButton from "../IconButton";
import bellIcon from "../../../ressources/icons/bell_notification.png";
import { useNavigate } from "react-router-dom";
import { updateNotification } from "@/api/updateNotification";
import { NotificationDropDownProps } from "@/interfaces/interfaces";

const NotificationDropDown: React.FC<NotificationDropDownProps> = ({
  notifications,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notificationRead, setNotificationRead] = useState<boolean>(false);

  const hasNotifications = notifications && notifications.length > 0;

  const navigate = useNavigate();

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node | null)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  console.log("notificationDropDown:", notifications);
  // console.log("notificationDropDown:", notifications);

  return (
    <div ref={componentRef} className="relative pt-1">
      {notifications?.length > 0 && (
        <div className="bg-red-700 rounded-full text-white text-sm font-semibold w-5 h-5 flex items-center justify-center absolute top-1 right-0">
          {notifications?.length}
        </div>
      )}
      <IconButton
        icon={bellIcon}
        onClick={() => setIsOpen(!isOpen)}
        disabled={!hasNotifications}
      />

      {isOpen && (
        <div className="flex absolute w-60 mt-2 bg-primary-color rounded-md shadow-lg z-10 left-1/2 transform -translate-x-1/2">
          <ul className="space-y-2 p-2">
            {notifications?.map((notificationItem, index) => (
              <li key={index}>
                <button
                  // className="w-full p-2 text-black text-sm hover:bg-theme-autumn/50 rounded-md"
                  className={`w-full p-2 text-white text-left font-nunito text-xl rounded-md hover:bg-theme-autumn/50
                    ${notificationRead ? "italic" : "font-normal"} `}
                  onClick={() => {
                    setNotificationRead(true);
                    updateNotification(
                      notificationItem.chatroom,
                      sessionStorage.getItem("id")
                    );
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
