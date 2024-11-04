from dao import DAO
from typing import List

class ChatDAO(DAO):
    @staticmethod
    def get_chatroom_names(user_id:int):
        # need to returns the chatroom_names, the other user id, firstname and profile picture  and the last_message
        pass

    @staticmethod
    def send_message(chat_name:str, sender_id:int, message:str, date:str) -> bool:
        query = "WITH match_data AS(SELECT id AS match_id FROM member_match WHERE chatroom_name = %s) INSERT INTO msg(match_id, sender_id, msg, date_sent) SELECT match_id, %s, %s, %s FROM match_data"
        params = (chat_name, sender_id, message, date)
        response = ChatDAO._prepare_statement('insert',query,params)
        if response:
            return response

    @staticmethod
    def get_messages(chat_name:str) -> List[str]:
        query = "SELECT sender_id, sender_first_name, message_content, date_sent FROM chatroom_messages_view WHERE chatroom_name = %s ORDER BY date_sent DESC"
        params = (chat_name,)
        response = ChatDAO._prepare_statement('select',query,params)
        if response:
            return response

    @staticmethod
    def get_last_message(chat_name:str) -> List[tuple]:
        query = "SELECT sender_id, sender_first_name, message_content, date_sent FROM chatroom_messages_view WHERE chatroom_name = %s ORDER BY date_sent DESC LIMIT 1"
        params = (chat_name,)
        response = ChatDAO._prepare_statement('select',query,params)
        if response:
            return response