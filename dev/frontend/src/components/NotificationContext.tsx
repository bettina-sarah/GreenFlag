import fetchData from "@/api/fetchData";
import React, { createContext, useContext, useState, useEffect } from "react";


interface NotificationData {
  notification: string;
  chatroom: string;
}


interface NotificationContextType {
  notifications: NotificationData | null;
  setNotifications: (notifications: NotificationData | null) => void;
}

interface NotificationProviderProps {
    children: React.ReactNode;
  }

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// A custom hook to use the NotificationContext
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

// The provider component that will wrap the app
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationData | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetchData<NotificationData>("/notifications", {id: sessionStorage.getItem("id") });
      if (response) {
        setNotifications(response);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
