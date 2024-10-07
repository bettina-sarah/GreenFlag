from abc import ABC, abstractmethod
from psycopg import pg
import constants

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
        except Exception as error:
            print(error)
            return False

    @staticmethod 
    def get_connection() -> None:
        if DAO.connection is None:
            return DAO.create_connection()
        else
            return DAO.connection()
        
    # connection pool maybe??? 

    @staticmethod
    def store_request(request) -> None: 
        pass

    @abstractmethod
    def send_request(params: tuple, query: str) -> bool:
        # connection
        pass

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
