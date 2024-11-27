import { updateData } from "./updateData";

interface NotificationData {
    notification_id: string;
    status: string;
  }
  
  export const updateNotification = async (notification_id: string, status: string) => {
    const data: NotificationData = { notification_id, status };
    const endpoint = "/update-notification"; // Specify the correct route for notification update
    return await updateData<NotificationData>(endpoint, data);
  };