'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : dao.py
Created By  : Bettina-Sarah Janesch
About       : Cette classe DAO gère la communication avec une base de données 
              PostgreSQL en encapsulant les opérations de connexion, d'exécution de 
              requêtes (select, insert, update, delete), et de gestion des erreurs, 
              afin de simplifier l'interaction avec la base de données tout en 
              garantissant une gestion centralisée des connexions et des exceptions.
====================================================================================
------------------------------------------------------------------------------------
'''

import psycopg as pg
from DAOs.constants import *

class DAO():
    connection = None
    pg_cursor = None
    
    @staticmethod
    def _create_connection():
        try:
            DAO.connection = pg.connect(dbname=DB_NAME,
                                    password=DB_PASSWORD,
                                    host=DB_HOST,
                                    port=DB_PORT, user=DB_USER)
            return DAO.connection
        except Exception as error:
            print(error)
            return False
    
    def _select_request(cursor) -> tuple:
        try:
            result = cursor.fetchall()
            if result:
                return result
        except Exception as e:
            print(e)
            return False   
    
    def _insert_request(cursor) -> bool:
        try:
            if cursor.rowcount > 0:
                return cursor.fetchone()
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
            return False
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


    @staticmethod
    def _send_request(connection_type, connection, query: str, params: tuple | list) -> tuple | bool :
        try:
            pg_cursor = connection.cursor()
            pg_cursor.execute(query, params)
            response = DAO.request_type[connection_type](pg_cursor)
            pg_cursor.close()
            return response
        except Exception as e:
            print(e)
            error = str(e).split("\n")
            if str(error[0]) == "FLAGGED TOO MANY TIME":
                return str(error[0])
            return False

    @staticmethod
    def _prepare_statement(request_type, query, params,many=False) -> bool:
        try:
            connection = DAO._get_connection()
            if many:
                response = DAO._send_requests(request_type, connection, query, params)    
            else:
                response = DAO._send_request(request_type, connection, query, params)
            connection.commit()
            return response
        except Exception as error:
            print(error)
        return False

    @staticmethod
    def _send_requests(connection_type, connection, query: str, params: tuple | list) -> None:
        try:
            pg_cursor = connection.cursor()
            pg_cursor.executemany(query, params)
            response = DAO.request_type[connection_type](pg_cursor)
            pg_cursor.close()
            return response
        except Exception as e:
            print(e)
            return False