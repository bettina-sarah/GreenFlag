import { updateData } from "./updateData";

interface NotificationData {
  notification_id: string;
}

export const updateNotification = async (notification_id: string) => {
  const data: NotificationData = { notification_id };
  const endpoint = "/update-notification";
  return await updateData<NotificationData>(endpoint, data);
};
