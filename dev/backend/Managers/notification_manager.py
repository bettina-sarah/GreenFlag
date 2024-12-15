'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : notification_manager.py
Created By  : Bettina-Sarah Janesch
About       : Classe qui gère les notifications des utilisateurs en interagissant 
              avec les DAO pour récupérer, formater, mettre à jour et supprimer 
              les notifications.
====================================================================================
------------------------------------------------------------------------------------
'''

from DAOs.notification_dao import NotificationDAO
import logging

class NotificationManager:
    @staticmethod
    def get_notifications(data) -> list:
        user_id = data.get('id')
        try:
            response = NotificationDAO.get_notifications(user_id)
            jsonified_response = NotificationManager.jsonify_notification_response(response)
            return jsonified_response
        except Exception as error:
            logging.error(f' {__class__}: error in get_notifications: {error}')
            return False
    
    @staticmethod
    def jsonify_notification_response(notification_list):
        new_list = []
        try:
            for notification in notification_list:
                new_list.append({'notification': notification[0], 'chatroom': notification[1]})
            return new_list
        except Exception as error:
            logging.error(f' {__class__}: error in jsonify_notification_response: {error}')
            return False

    @staticmethod
    def update_notification(data) -> None:
        notification_id = data.get('notification_id')
        user_id = data.get('user_id')
        try:
            response = NotificationDAO.update_notification(notification_id, user_id)
            return response
        except Exception as error:
            logging.error(f' {__class__}: error in update_notification: {error}')
            return False


    def delete_notification(self, notification) -> None:
        pass

    def get_new_notifications(self) -> list:
        pass