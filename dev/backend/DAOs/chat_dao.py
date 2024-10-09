from dao import DAO
from typing import List

class ChatDAO(DAO):

    def __init__(self) -> None:
        pass

    @staticmethod   
    def _create_connection(params: dict ) -> None:
        pass    

    # all dao methods need to be redefined here?

    def create_chat(self) -> bool:
        pass

    def update_chat(self) -> bool:
        pass

    def delete_chat(self) -> bool:
        pass

    def get_chatroom_id(self, user_id):
        pass

    def send_message(self, chat_id, message) -> bool:
        pass

    def get_messages(self, chat_id) -> List[str]:
        pass
