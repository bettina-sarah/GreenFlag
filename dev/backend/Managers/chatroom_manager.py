from backend.DAO.chat_dao import ChatDAO

# another class that manages the websocket chatroom? 
class ChatroomManager:
    def __init__(self, chatroom) -> None:
        self.chatrooms = []
        self.chatroom_messages = {chatroom: ['messages']}   #{chatroom:[messages]}
    
    def get_chatrooms(self, user_id) -> list:
        #speak with ChatroomDAO... [chatroom_ids, ...]
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