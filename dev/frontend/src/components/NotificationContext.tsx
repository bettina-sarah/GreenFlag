import fetchData from "@/api/fetchData";
import React, { createContext, useContext, useState, useEffect } from "react";

// source: https://react.dev/learn/passing-data-deeply-with-context

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

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// A custom hook to use the NotificationContext
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationData | null>(
    null
  );

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetchData<NotificationData>("/notifications", {
        id: sessionStorage.getItem("id"),
      });
      if (response) {
        setNotifications(response);
      }
    };

    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
