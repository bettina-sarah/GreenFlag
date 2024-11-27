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
            return response

                    # email sequence here
        except Exception as error:
            print(error)
            print('notification manager')
            return False

    @staticmethod
    def update_notification_status(notification_subject_id) -> None:
        pass

    # def add_notification(self, notification) -> None:
    #     pass

    def delete_notification(self, notification) -> None:
        pass

    def get_new_notifications(self) -> list:
        pass