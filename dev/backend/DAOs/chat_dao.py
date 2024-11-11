from DAOs.dao import DAO
from DAOs.account_dao import AccountDAO
from typing import List

class ChatDAO(DAO):
    @staticmethod
    def get_chatroom_names(params:tuple) -> list:
        # need to returns the chatroom_names, the other user id, firstname and profile picture  and the last_message
        query = "SELECT * FROM get_chatrooms_intricate(%s)"
        response = ChatDAO._prepare_statement('select', query, params)
        chatrooms = []
        if response:
            for chat in response:
                subject_firstname = ChatDAO.get_subject_firstname(chat[0])
                params = (chat[0],)
                profile_photo = AccountDAO.get_photos(params, extraquery=' ORDER BY position LIMIT 1;')
                chatroom = {
                    "name": chat[1],
                    "subject": {
                        "id": chat[0],
                        "firstname": subject_firstname[0],
                        "profile_photo": profile_photo
                    },
                    "last_message":{
                        "sender_id": chat[2],
                        "sender_first_name": chat[3],
                        "content": chat[4],
                        "date_sent": chat[5]
                    }
                }
                chatrooms.append(chatroom)
        return chatrooms

    @staticmethod
    def get_subject_firstname(subject_id):
        query = "SELECT first_name FROM member WHERE id = %s;"
        params = (subject_id,)
        response = ChatDAO._prepare_statement('select', query, params)
        if response:
            return response

    @staticmethod
    def send_message(chat_name:str, sender_id:int, message:str, date:str) -> bool:
        query = "WITH match_data AS(SELECT id AS match_id FROM member_match WHERE chatroom_name = %s) INSERT INTO msg(match_id, sender_id, msg, date_sent) SELECT match_id, %s, %s, %s FROM match_data;"
        params = (chat_name, sender_id, message, date)
        response = ChatDAO._prepare_statement('insert', query, params)
        if response:
            return response

    @staticmethod
    def send_messages(messages:list[tuple[str, int]]) -> bool:
        query = "WITH match_data AS(SELECT id AS match_id FROM member_match WHERE chatroom_name = %s) INSERT INTO msg(match_id, sender_id, msg, date_sent) SELECT match_id, %s, %s, %s FROM match_data;"
        print(messages)
        response = ChatDAO._prepare_statement('select',query,messages,many=True)
        if response:
            return response
        return False

    @staticmethod
    def get_messages(params:tuple) -> List[str]:
        query = "SELECT sender_id, sender_first_name, message_content, date_sent FROM chatroom_messages_view WHERE chatroom_name = %s ORDER BY date_sent;"
        response = ChatDAO._prepare_statement('select', query, params)
        messages = []
        if response:
            for msg in response:
                message = {
                    "sender_id": msg[0],
                    "sender_first_name": msg[1],
                    "message_content": msg[2],
                    "date_sent": msg[3]
                }
                messages.append(message)
            return messages

    @staticmethod
    def get_last_message(chat_name:str) -> List[tuple]:
        query = "SELECT sender_id, sender_first_name, message_content, date_sent FROM chatroom_messages_view WHERE chatroom_name = %s ORDER BY date_sent DESC LIMIT 1;"
        params = (chat_name,)
        response = ChatDAO._prepare_statement('select', query, params)
        if response:
            return response