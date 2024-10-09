from dao import DAO
from typing import List
#from backend.util_classes.email_adapter import EmailAdapter

class AccountDAO(DAO):

    def update_account() -> bool:
        return True

    @staticmethod
    def login(params:tuple) -> bool:
        query = 'SELECT * FROM member WHERE email = %s and member_password = %s'
        response = AccountDAO._prepare_statement(query, params)
        # user returned ici : 
        return response


    @staticmethod
    def create_account(params:tuple) -> bool:
            query = 'INSERT INTO member (first_name, last_name, email, member_password) VALUES (%s, %s, %s, %s) RETURNING id;'
            response = AccountDAO._prepare_statement("insert", query, params)
            # si courriel existe deja, DB retorune erreur cle existe - faut gerer - envoyer au frontend 'account exists' 
            return response
    
    # rudimentaire: version finale faut que ca delete la personne des tables de suggestions de tout le monde, les match, les messages, les photos dans berkeleyDB
    @staticmethod
    def delete_account(params:tuple) -> bool:
        query = 'DELETE FROM member where email = %s and member_password = %s;'
        response = AccountDAO._prepare_statement("delete", query, params)
        return response

    
    @staticmethod
    def get_profile(params:tuple) -> List[tuple]:
        query = 'SELECT * FROM member where email = %s;'
        response = AccountDAO._prepare_statement("select", query, params)
        return response
    
    '''
    !!!! ATTENTION: quand il faut modifier plusieurs tables:
    UPDATE accounts SET contact_first_name = first_name,
                     contact_last_name = last_name
    FROM employees WHERE employees.id = accounts.sales_person;
    '''
    @staticmethod
    def modify_profile(params:tuple) -> bool:
        query = 'UPDATE member SET first_name =%s, last_name = %s WHERE email = %s and member_password = %s;'
        response = AccountDAO._prepare_statement("update", query, params)
        return response
    # retour: UPDATE 1








    
        # try:
        #     connection = DAO.get_connection()
        #     query = 'SELECT * FROM member WHERE email = %s and member_password = %s'
        #     response = DAO.send_request(connection, query, params)
        #     return response
        # except Exception as error:  
        #     print(error)
        # return False