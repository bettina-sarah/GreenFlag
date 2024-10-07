from dao import DAO
from typing import List
#from backend.util_classes.email_adapter import EmailAdapter

class AccountDAO(DAO):


    def create_account() -> bool:
        return True

    def update_account() -> bool:
        return True

    def get_user_infos(user_id) -> List[tuple]:
        pass

    def delete_account() -> bool:
        return True
    
    def login(params:tuple) -> bool:
        try:
            connection = DAO.create_connection()
            pg_cursor = connection.cursor()
            pg_cursor.execute('SELECT * FROM member WHERE email = %s and member_password = %s', params)
            print(pg_cursor.fetchall())
            return True
        except Exception as error:  
            print(error)

        #query: str 

            # connection = pg.connect(dbname=DB_NAME,
            #                         password="AAAaaa123",
            #                         host="localhost",
            #                         port=5432, user='postgres')
            # pg_cursor = connection.cursor()
            # pg_cursor.execute('SELECT * FROM member WHERE email = %s and member_password = %s', params)
            # print(pg_cursor.fetchall())
        return False



# if __name__ == '__main__':
#     if not AccountDAO.login():
#         print("hello")