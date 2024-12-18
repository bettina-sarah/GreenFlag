'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : chat_dao.py
Created By  : Vincent Fournier
About       : Contient les méthodes principales d'accès aux données pour gérer les 
              salons de discussion, y compris la récupération des messages, des noms 
              de salons, des sujets, et l'insertion de nouveaux messages ou 
              signalements d'utilisateurs.
====================================================================================
------------------------------------------------------------------------------------
'''

from DAOs.dao import DAO
from DAOs.account_dao import AccountDAO
from typing import List

class ChatDAO(DAO):
    @staticmethod
    def get_chatroom_names(params: tuple) -> list:
        # need to returns the chatroom_names, the other user id, firstname and profile picture  and the last_message
        query = "SELECT * FROM get_chatrooms(%s)"
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
    def get_subject_firstname(subject_id: int) -> list[tuple[str]]:
        query = "SELECT first_name FROM member WHERE id = %s;"
        params = (subject_id,)
        response = ChatDAO._prepare_statement('select', query, params)
        if response:
            return response

    @staticmethod
    def send_message(chat_name: str, sender_id: int, message: str, date: str) -> bool:
        query = "WITH match_data AS(SELECT id AS match_id FROM member_match WHERE chatroom_name = %s) INSERT INTO msg(match_id, sender_id, msg, date_sent) SELECT match_id, %s, %s, %s FROM match_data;"
        params = (chat_name, sender_id, message, date)
        response = ChatDAO._prepare_statement('insert', query, params)
        if response:
            return response

    @staticmethod
    def send_messages(messages: list[tuple[str, int]]) -> bool:
        query = "WITH match_data AS(SELECT id AS match_id FROM member_match WHERE chatroom_name = %s) INSERT INTO msg(match_id, sender_id, msg, date_sent) SELECT match_id, %s, %s, %s FROM match_data;"
        print(messages)
        response = ChatDAO._prepare_statement('select', query, messages, many=True)
        if response:
            return True
        return False
    
    @staticmethod
    def add_fake_msgs(messages: list[tuple[str,int]]) -> bool:
        query = "INSERT INTO msg(match_id, sender_id, msg, date_sent) VALUES(%s,%s,%s,%s) RETURNING id;"
        response = ChatDAO._prepare_statement('insert', query, messages, many=True)
        if response:
            return True
        return False

    @staticmethod
    def get_messages(params: tuple) -> List[dict[str]]:
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
    def get_last_message(chat_name: str) -> List[tuple]:
        query = "SELECT sender_id, sender_first_name, message_content, date_sent FROM chatroom_messages_view WHERE chatroom_name = %s ORDER BY date_sent DESC LIMIT 1;"
        params = (chat_name,)
        response = ChatDAO._prepare_statement('select', query, params)
        if response:
            return response

    @staticmethod
    def get_chatroom_subject(params: tuple) -> List[str]:
        query = "WITH chat_suggestion AS(SELECT suggestion_id FROM member_match WHERE chatroom_name = %s) SELECT member_id_1, member_id_2 FROM suggestion WHERE id IN (SELECT suggestion_id FROM chat_suggestion);"
        response = ChatDAO._prepare_statement('select', query, params)
        if response:
            return response
    
    @staticmethod
    def flag_user(params: tuple) -> bool:
        query = "INSERT INTO flagged (member_id, reporter_id, reason) VALUES (%s, %s, %s) RETURNING reporter_id;"
        response = ChatDAO._prepare_statement("insert", query, params)
        return response
    
    @staticmethod
    def get_matches_without_msg() -> List[tuple[int]]:
        query = '''
        SELECT
            mm.id AS match_id,
            s.member_id_1,
            s.member_id_2
        FROM 
            member_match AS mm
        JOIN
            suggestion AS s ON mm.suggestion_id = s.id
        LEFT JOIN
            msg AS m ON m.match_id = mm.id
        WHERE
            m.id IS NULL;
        '''
        params = ()
        response = ChatDAO._prepare_statement('select', query, params)
        
        return response