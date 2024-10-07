from abc import ABC, abstractmethod
import psycopg as pg
from constants import *

class DAO(ABC):
    connection = None

    @staticmethod
    def create_connection():
        # confirm that the database is available
        try:
            DAO.connection = pg.connect(dbname=DB_NAME,
                                    password=DB_PASSWORD,
                                    host=DB_HOST,
                                    port=DB_PORT, user=DB_USER)
            return DAO.connection
        except Exception as error:
            print(error)
            return False

    @staticmethod 
    def get_connection() -> None:
        if DAO.connection is None:
            DAO.connection = DAO.create_connection()
            return DAO.connection
        else:
            return DAO.connection
        
    # connection pool maybe??? 

    @staticmethod
    def store_request(request) -> None: 
        pass

    @abstractmethod
    def send_request(connection, query: str, params: tuple) -> bool:
        try:
            pg_cursor = connection.cursor()
            pg_cursor.execute(query, params)
            print(pg_cursor.fetchall())
            return True
        except Exception as e:
            print(e)
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
