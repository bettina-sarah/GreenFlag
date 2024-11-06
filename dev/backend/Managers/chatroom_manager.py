from DAOs.chat_dao import ChatDAO
from util_classes.discharged_list import DischargedList
from util_classes.observer import Observer
# another class that manages the websocket chatroom? 
class ChatroomManager(Observer):
    def __init__(self) -> None:
        self.requests = DischargedList(5,5)
        self.requests.add_observer(self)
    
    def __call__(self, list):
        pass
    
    def get_chatrooms(self, data) -> list:
        id = data.get("id")
        params = (id,)
        response = ChatDAO.get_chatroom_names(params)
        if response:
            return response
        return []

    def get_chatroom_messages(self, data) -> list:
        chatroom_name = data.get("chatroom_name")
        params = (chatroom_name)
        response = ChatDAO.get_messages(params)
        if response:
            return response
        return []

    def add_chatroom_message(self,data) -> None:
        chatroom_name = data.get("chatroom_name")
        message = data.get("message")
        sender = data.get("sender_id")
        date = data.get("date")
        new_message = (chatroom_name, sender, date, message)
        self.requests.add_item(new_message)