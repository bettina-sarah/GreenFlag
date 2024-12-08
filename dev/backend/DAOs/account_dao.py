from DAOs.dao import DAO
from typing import List
#from backend.util_classes.email_adapter import EmailAdapter

class AccountDAO(DAO):

    def update_account() -> bool:
        return True

    @staticmethod
    def login(params:tuple) -> bool:
        query = 'SELECT id, profile_completed FROM member WHERE email = %s and member_password = %s'
        response = AccountDAO._prepare_statement("select", query, params)
        print('login response:', response)
        return response


    @staticmethod
    def create_account(params:tuple) -> int:
            query = 'INSERT INTO member (first_name, last_name, email, member_password) VALUES (%s, %s, %s, %s) RETURNING id;'
            response = AccountDAO._prepare_statement("insert", query, params)
            # si courriel existe deja, DB retorune erreur cle existe - faut gerer - envoyer au frontend 'account exists' 
            return response
    
    @staticmethod
    def complete_profile(params:tuple) -> bool:
        query = 'UPDATE member SET profile_completed = true WHERE id = %s;'
        response = AccountDAO._prepare_statement("update", query, params)
        return response
    
    @staticmethod
    def save_token(params:tuple) -> bool:
        query = 'UPDATE member SET token = %s WHERE id = %s;'
        response = AccountDAO._prepare_statement("update", query, params)
        return response
    
    @staticmethod
    def does_token_exist(params:tuple) -> bool:
        query = 'SELECT EXISTS(SELECT 1 FROM member WHERE id = %s AND token = %s) AS is_valid;'
        response = AccountDAO._prepare_statement("select", query, params)
        return response
    
    
    # rudimentaire: version finale faut que ca delete la personne des tables de suggestions de tout le monde, les match, les messages, les photos dans berkeleyDB
    @staticmethod
    def delete_account(params:tuple) -> bool:
        query = 'DELETE FROM member where email = %s and member_password = %s;'
        response = AccountDAO._prepare_statement("delete", query, params)
        return response

    @staticmethod
    def get_user_infos(user_id:int) -> List[tuple]:
        query = "SELECT * FROM member_activities_view WHERE member_id = %s;"
        params = (user_id,)
        response = AccountDAO._prepare_statement("select",query,params)
        return response
    
    @staticmethod
    def get_profile(params:tuple) -> List[tuple]:
        query = 'SELECT * FROM member where id = %s;'
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
    
    def update_preferences(columns,values,user_id) -> bool:
    
        query = "UPDATE member SET " + ", ".join([f"{col} = %s" for col in columns]) + " WHERE id = %s"
        params = values + [user_id]
        response = AccountDAO._prepare_statement("update", query, params)
        return response



    @staticmethod
    def add_photos(params:tuple) -> bool:
        # params: (user id, keys)
        # delete & remake it all.
        ''' ------ postgres DOCU:
        PostgreSQL lets you reference columns of other tables in the WHERE condition by specifying the other tables in the USING
        clause. For example, to delete all films produced by a given producer, one can do:

        DELETE FROM films USING producers
        WHERE producer_id = producers.id AND producers.name = 'foo';
        What is essentially happening here is a join between films and producers, with all successfully joined films rows being marked
        for deletion. This syntax is not standard. A more standard way to do it is:

        DELETE FROM films
        WHERE producer_id IN (SELECT id FROM producers WHERE name = 'foo');
        '''
        print('accounTdao, add photos', params)
        # query = 'SELECT add_photos(%s, ARRAY[%s]);'
        # we format the sql array in manager
        query = 'SELECT add_photos(%s, %s);'
        response = AccountDAO._prepare_statement("select", query, params)
        if response:
            return response
        return False
    
    @staticmethod
    def get_photos(params:tuple, extraquery=';') -> List[tuple]:   
        query = 'SELECT encryption_key from member_photos_view where member_id = %s' + extraquery
        response = AccountDAO._prepare_statement("select", query, params)
        if response:
            return response
        return False

    @staticmethod
    def update_hobbies(params:tuple) -> bool:
        query = 'SELECT update_hobbies(%s, %s);'
        response = AccountDAO._prepare_statement("select", query, params)
        return response
    
    @staticmethod
    def update_localisation(params:tuple) -> bool:
        query = 'UPDATE member SET last_lat = %s, last_long = %s WHERE id = %s'
        response = AccountDAO._prepare_statement('update',query,params)
        return response