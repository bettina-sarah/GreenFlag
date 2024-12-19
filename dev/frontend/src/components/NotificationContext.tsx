/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : NotificationContext.tsx
Created By  : Bettina-Sarah Janesch
About       : Le composant NotificationProvider fournit un contexte pour gérer les 
              notifications dans l'application. Il utilise un fetchData pour récupérer 
              les notifications de l'API toutes les 5 secondes et met à jour l'état 
              des notifications avec les données obtenues. Un useNotifications est 
              fourni pour accéder aux notifications depuis n'importe où dans 
              l'application, avec une vérification pour s'assurer que le hook est 
              utilisé à l'intérieur d'un NotificationProvider.
====================================================================================
------------------------------------------------------------------------------------
*/

import fetchData from "@/api/fetchData";
import React, { createContext, useContext, useState, useEffect } from "react";
import { NotificationData, NotificationContextType, NotificationProviderProps } from "@/interfaces/interfaces";
// source: https://react.dev/learn/passing-data-deeply-with-context

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
