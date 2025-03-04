/*
------------------------------------------------------------------------------------
====================================================================================
Fichier     : updateNotification.ts
Créé par    : Bettina-Sarah Janesch
Résumé      : Fonction spécifique pour mettre à jour une notification en envoyant 
              des données typées `NotificationData` à un endpoint via `updateData`.
====================================================================================
------------------------------------------------------------------------------------
*/

import { updateData } from "./updateData";
import { NotificationUpdateData } from "@/interfaces/interfaces";


export const updateNotification = async (
  notification_id: string,
  user_id: string
) => {
  const data: NotificationUpdateData = { notification_id, user_id };
  const endpoint = "/update-notification";
  return await updateData<NotificationUpdateData>(endpoint, data);
};
