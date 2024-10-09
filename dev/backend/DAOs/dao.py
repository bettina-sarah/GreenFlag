import psycopg as pg
from constants import *

class DAO():
    connection = None
    pg_cursor = None
    
    @staticmethod
    def _create_connection():
        # TO ADD: confirm that the database is available ?
        try:
            DAO.connection = pg.connect(dbname=DB_NAME,
                                    password=DB_PASSWORD,
                                    host=DB_HOST,
                                    port=DB_PORT, user=DB_USER)
            return DAO.connection
        except Exception as error:
            print(error)
            return False
    
    def _select_request(cursor) -> tuple: # retour pas claire? faut debug qsq c'est retourné
        try:
            result = cursor.fetchall()
            if result:
                return result
        except Exception as e:
            print(e)
            return False   
    
    # --- ATTENTION: insert, delete, update: same thing. not sure if they differ in the database - TO REFACTOR
    
    def _insert_request(cursor) -> bool:
        try:
            if cursor.rowcount > 0: # we might want to know how much was inserted, return count later
                return True
        except Exception as e:
            print(e)
            return False
    
    def _delete_request(cursor) -> bool:
        try:
            if cursor.rowcount > 0:
                return True
        except Exception as e:
            print(e)
            return False 
    
    def _update_request(cursor) -> bool:
        try:
            if cursor.rowcount > 0:
                return True
        except Exception as e:
            print(e)
            return False 

    request_type = {
    "select":_select_request,
    "insert":_insert_request,
    "delete":_delete_request,
    "update":_update_request }

    @staticmethod 
    def _get_connection() -> None:
        if DAO.connection is None:
            DAO.connection = DAO._create_connection()
            return DAO.connection
        else:
            return DAO.connection
        
    # connection pool maybe??? 

    @staticmethod
    def store_request(request) -> None: 
        pass

    @staticmethod
    def _send_request(connection_type, connection, query: str, params: tuple) -> tuple | bool :
        try:
            pg_cursor = connection.cursor()
            pg_cursor.execute(query, params)
            response = DAO.request_type[connection_type](pg_cursor) # tuple OR bool!
            return response
        except Exception as e:
            print(e)
            return False

    # this can be in DAO directly 
    @staticmethod
    def _prepare_statement(request_type, query, params) -> bool:
        try:
            connection = DAO._get_connection()
            response = DAO._send_request(request_type, connection, query, params)
            connection.commit() # possibly necessary for an insert request
            return response
        except Exception as error:  
            print(error)
        return False

    @staticmethod
    def send_requests(requests: list) -> None:

        pass


    # def __next__(self):
    #     pass

    # def __len__(self) -> int:
    #     pass

    # def __getitem__(self, item):
    #     pass

    # def __setitem__(self, key, value):
    #     pass

    # def __delitem__(self, key):
    #     pass

    # def __contains__(self, item):
    #     pass

    # def __call__(self, *args, **kwargs):
    #     pass
    


    # def insert_request(connection, query: str, params: tuple) -> bool:
    #     try:
    #         pg_cursor = connection.cursor()
    #         pg_cursor.execute(query, params)
    #         if pg_cursor.rowcount > 0:
    #             return True
    #     except Exception as e:
    #         print(e)
    #         return False 

    # def delete_request(connection, query: str, params: tuple) -> bool:
    #     try:
    #         pg_cursor = connection.cursor()
    #         pg_cursor.execute(query, params)
    #         if pg_cursor.rowcount > 0:
    #             return True
    #     except Exception as e:
    #         print(e)
    #         return False  

    # def update_request(connection, query: str, params: tuple) -> bool:
    #     try:
    #         pg_cursor = connection.cursor()
    #         pg_cursor.execute(query, params)
    #         if pg_cursor.rowcount > 0:
    #             return True
    #     except Exception as e:
    #         print(e)
    #         return False 