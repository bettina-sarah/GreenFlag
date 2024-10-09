from DAOs.dao import DAO
from typing import List
#from backend.util_classes.email_adapter import EmailAdapter

class AccountDAO(DAO):

    @staticmethod   
    def create_connection(params: dict ) -> None:
        pass    

    # all dao methods need to be redefined here?

    def create_account() -> bool:
        return True

    def update_account() -> bool:
        return True

    def get_user_infos(user_id) -> List[tuple]:
        pass

    def delete_account() -> bool:
        return True
    
    def login() -> bool:
        return False



# if __name__ == '__main__':
#     if not AccountDAO.login():
#         print("hello")