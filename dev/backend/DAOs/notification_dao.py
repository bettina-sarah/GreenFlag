from DAOs.dao import DAO
from typing import List

class NotificationDAO(DAO):
    def __init__(self) -> None:
        pass
    
    @staticmethod
    def get_notifications(user_id:int) -> List[tuple]:
        query = "SELECT msg, chatroom_name FROM alert_notification WHERE member_id = %s AND is_read = false"
        params = (user_id,)
        response = NotificationDAO._prepare_statement("select",query,params)
        return response
    
    @staticmethod
    def update_notification(notification_id:int) -> List[tuple]:
        query = 'UPDATE alert_notification SET is_read = true WHERE chatroom_name = %s;'
        # chatroom name si what we keep in the FE 
        params = (notification_id,)
        response = NotificationDAO._prepare_statement("update",query,params)
        return response

    @staticmethod
    def _create_connection(params: dict) -> None:
        pass

    def send_notification(self) -> bool:
        return True

    def modify_notification_status(self) -> bool:
        return True

    def get_notification(self, user_id) -> List[str]:
        return []