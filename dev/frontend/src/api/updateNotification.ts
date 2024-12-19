/*
------------------------------------------------------------------------------------
Fichier     : updateNotification.ts
Créé par    : Bettina-Sarah Janesch
Résumé      : Fonction spécifique pour mettre à jour une notification en envoyant 
              des données typées `NotificationData` à un endpoint via `updateData`.
------------------------------------------------------------------------------------
*/

import { updateData } from "./updateData";

interface NotificationData {
  notification_id: string;
  user_id: string;
}

export const updateNotification = async (
  notification_id: string,
  user_id: string
) => {
  const data: NotificationData = { notification_id, user_id };
  const endpoint = "/update-notification";
  return await updateData<NotificationData>(endpoint, data);
};
