from DAOs.account_dao import AccountDAO
#from account_dao import AccountDAO
from abc import ABC, abstractmethod
from flask import jsonify

import psycopg as pg


class AccountManager(ABC):
    def __init__(self) -> None:
        pass
    
    @staticmethod
    def login(data) -> bool:
        email = data.get('email')
        password = data.get('password')
        
        params = (email,password)
        
        # 
        try:
            connection = pg.connect(dbname="postgres",
                                    password="AAAaaa123",
                                    host="localhost",
                                    port=5432, user='postgres')
            pg_cursor = connection.cursor()
            pg_cursor.execute('SELECT * FROM member WHERE email = %s and member_password = %s', params)
            print(pg_cursor.fetchall())
            return True
            
            
    #     cur.execute("""
    # INSERT INTO some_table (id, created_at, updated_at, last_name)
    # VALUES (%(id)s, %(created)s, %(created)s, %(name)s);
    # """,
    # {'id': 10, 'name': "O'Reilly", 'created': datetime.date(2020, 11, 18)})
            
        except Exception as error:
            print(error)
        return False

    @staticmethod
    def get_profile(data) -> bool:
        pass
    
    @staticmethod
    def modify_profile(data) -> bool:
        pass
    
    @staticmethod
    def delete_account(data) -> bool:
        pass
    


if __name__ == '__main__':
    if not AccountManager.login(True):
        print("hello")