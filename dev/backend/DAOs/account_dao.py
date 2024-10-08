from dao import DAO
from typing import List
#from backend.util_classes.email_adapter import EmailAdapter

class AccountDAO(DAO):

    def update_account() -> bool:
        return True

    @staticmethod
    def login(params:tuple) -> bool:
        query = 'SELECT * FROM member WHERE email = %s and member_password = %s'
        response = AccountDAO.prepare_statement(query, params)
        return response


    @staticmethod
    def create_account(params:tuple) -> bool:
            query = 'INSERT INTO member (first_name, last_name, email, member_password) VALUES (%s, %s, %s, %s) RETURNING id;'
            response = AccountDAO.prepare_statement(query, params)
            return response
    
    # rudimentaire: version finale faut que ca delete la personne des tables de suggestions de tout le monde, les match, les messages, les photos dans berkeleyDB
    @staticmethod
    def delete_account(params:tuple) -> bool:
        query = 'DELETE FROM member where email = %s and member_password = %s;'
        response = AccountDAO.prepare_statement(query, params)
        return response
    
    
    # this can be in DAO directly 
    def prepare_statement(query, params) -> bool:
        try:
            connection = DAO.get_connection()
            response = DAO.send_request(connection, query, params)
            connection.commit() # possibly necessary for an insert request
            return response
        except Exception as error:  
            print(error)
        return False
    
    def get_profile(params:tuple) -> List[tuple]:
        query = 'SELECT * FROM member where email = %s;'
        response = AccountDAO.prepare_statement(query, params)
        return response
    
        # try:
        #     connection = DAO.get_connection()
        #     query = 'SELECT * FROM member WHERE email = %s and member_password = %s'
        #     response = DAO.send_request(connection, query, params)
        #     return response
        # except Exception as error:  
        #     print(error)
        # return False