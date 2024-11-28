from DAOs.notification_dao import NotificationDAO

class NotificationManager:
    def __init__(self) -> None:
        pass
        self.new_notifications = [] # [(notification.subject_id)]
        self.read_notifications = []      #[(notification.subject_id)]

    @staticmethod
    def get_notifications(data) -> list:
        user_id = data.get('id')
        try:
            response = NotificationDAO.get_notifications(user_id)
            #[('You matched with John!', 'chatroom_1_2'), ('You matched with John!', 'chatroom_1_3'), ('You matched with John!', 'chatroom_1_4'), ('You have a new message from Jane', 'chatroom_1_2')]
            jsonified_response = NotificationManager.jsonify_notification_response(response)
            return jsonified_response
                    # email sequence here
        except Exception as error:
            print(error)
            print('notification manager')
            return False
    
    @staticmethod
    def jsonify_notification_response(notification_list):
        new_list = []
        try:
            for notification in notification_list:
                new_list.append({'notification': notification[0], 'chatroom': notification[1]})
            return new_list
        except Exception as error:
            print(error)
            return False

    @staticmethod
    def update_notification(data) -> None:
        notification_id = data.get('notification_id')
        user_id = data.get('user_id')
        try:
            response = NotificationDAO.update_notification(notification_id, user_id)
            return response
                    # email sequence here
        except Exception as error:
            print(error, __class__)
            return False

    # def add_notification(self, notification) -> None:
    #     pass

    def delete_notification(self, notification) -> None:
        pass

    def get_new_notifications(self) -> list:
        pass