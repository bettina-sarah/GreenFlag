from DAOs.chat_dao import ChatDAO
from util_classes.discharged_list import DischargedList
# another class that manages the websocket chatroom? 
class ChatroomManager:
    def __init__(self) -> None:
        self.request = DischargedList(5,5)
        
    
    def get_chatrooms(self, data) -> list:
        id = data.get("id")
        params = (id,)
        response = ChatDAO.get_chatroom_names(params)
        if response:
            return response
        return []

    def get_chatroom_messages(self, chatroom_id) -> list:
        return []

    def add_chatroom(self, chatroom) -> None:
        pass

    def delete_chatroom(self, chatroom) -> None:
        self.chatrooms.remove(chatroom)
        pass

    def add_chatroom_message(self, chatroom, message) -> None:
        #add message to chatroom DAO
        pass