from DAOs.chat_dao import ChatDAO
from util_classes.discharged_list import DischargedList
# another class that manages the websocket chatroom? 
class ChatroomManager(DischargedList.Observer):
    def __init__(self) -> None:
        self.requests = DischargedList(5,5)
        self.requests.add_observer(self)
    
    def __call__(self, list:list[tuple[str,int]]):
        response = ChatDAO.send_messages(list)
        if response:
            return response
        return False
    
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
        self.requests.add_item(data)