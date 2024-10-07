from dao import DAO
from typing import List
#from backend.util_classes.email_adapter import EmailAdapter

class AccountDAO(DAO):




    def update_account() -> bool:
        return True

    def get_user_infos(user_id) -> List[tuple]:
        pass

    def delete_account() -> bool:
        return True
    
    def login(params:tuple) -> bool:
        try:
            connection = DAO.get_connection()
            query = ('SELECT * FROM member WHERE email = %s and member_password = %s')
            response = DAO.send_request(connection, query, params)
            return response
        except Exception as error:  
            print(error)
        return False

    def create_account(params:tuple) -> bool:
        try:
            connection = DAO.get_connection()
            query = ('INSERT INTO member (first_name, last_name, member_password,email) VALUES (%s, %s, %s, %s)')
            response = DAO.send_request(connection, query, params)
            return response
        except Exception as error:  
            print(error)
            print('account dao')
        return False



# if __name__ == '__main__':
#     if not AccountDAO.login():
#         print("hello")