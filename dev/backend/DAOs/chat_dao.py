from dao import DAO
from typing import List

class ChatDAO(DAO):
    def delete_chat(self) -> bool:
        pass

    def get_chatroom_id(self, user_id):
        pass

    def send_message(self, chat_id, message) -> bool:
        pass

    def get_messages(self, chat_id) -> List[str]:
        pass
