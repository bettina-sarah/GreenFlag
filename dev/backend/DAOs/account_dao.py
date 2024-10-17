from dao import DAO
from typing import List
#from backend.util_classes.email_adapter import EmailAdapter

class AccountDAO(DAO):

    def update_account() -> bool:
        return True

    @staticmethod
    def login(params:tuple) -> bool:
        query = 'SELECT * FROM member WHERE email = %s and member_password = %s'
        response = AccountDAO._prepare_statement("select", query, params)
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

    @staticmethod
    def add_photos(params:tuple) -> bool:
        # params: (user id, keys)
        # delete & remake it all.
        '''
        ------ postgres DOCU:
        PostgreSQL lets you reference columns of other tables in the WHERE condition by specifying the other tables in the USING
        clause. For example, to delete all films produced by a given producer, one can do:

        DELETE FROM films USING producers
        WHERE producer_id = producers.id AND producers.name = 'foo';
        What is essentially happening here is a join between films and producers, with all successfully joined films rows being marked
        for deletion. This syntax is not standard. A more standard way to do it is:

        DELETE FROM films
        WHERE producer_id IN (SELECT id FROM producers WHERE name = 'foo');
        '''
        user_param, photo_keys = params
        query = 'DELETE from member_photo USING member WHERE member_photo.member_id = member.id AND member.user_id = %s;'
        response = AccountDAO._prepare_statement("delete", query, user_param)
        if response:
            query = 'INSERT INTO member_photo (user_id, photo)'
            for i in range(photo_keys): # build the query progressively based on how many photos
                query += ' VALUES (%s, %s),'
                if i == photo_keys - 1:
                    query = query[:-1]
                    query += ' RETURNING id;' # might not work bc multiple inserts
                response = AccountDAO._prepare_statement("insert", query, params)
            return response
    
    """
    list of ids orderd in the way they appear
    relace """
    # retour: UPDATE 1








    
        # try:
        #     connection = DAO.get_connection()
        #     query = 'SELECT * FROM member WHERE email = %s and member_password = %s'
        #     response = DAO.send_request(connection, query, params)
        #     return response
        # except Exception as error:  
        #     print(error)
        # return False