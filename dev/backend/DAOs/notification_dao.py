'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : notification_dao.py
Created By  : Bettina-Sarah Janesch
About       : Classe qui hérite de la classe DAO et qui interagit avec la base 
              de données pour gérer les notifications usager. Elle inclut des 
              méthodes pour récupérer et mettre à jour le statut des notifications, 
              en exécutant des requêtes SQL préparées.
====================================================================================
------------------------------------------------------------------------------------
'''

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
    def update_notification(notification_id:int, user_id:str) -> List[tuple]:
        query = 'UPDATE alert_notification SET is_read = true WHERE chatroom_name = %s AND member_id = %s;'
        # chatroom name is what we keep in the FE 
        params = (notification_id,user_id)
        response = NotificationDAO._prepare_statement("update",query,params)
        return response