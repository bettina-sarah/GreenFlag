from dao import DAO
from typing import List

class NotificationDAO(DAO):
    def __init__(self) -> None:
        pass

    @staticmethod
    def create_connection(params: dict) -> None:
        pass

    def send_notification(self) -> bool:
        return True

    def modify_notification_status(self) -> bool:
        return True

    def get_notification(self, user_id) -> List[str]:
        return []