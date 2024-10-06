from dao import DAO
from types import List
from util_classes.email_adapter import EmailAdapter

class AccountDAO(DAO):

    def __init__(self) -> None:
        pass

    @staticmethod   
    def create_connection(params: dict ) -> None:
        pass    

    # all dao methods need to be redefined here?

    def create_account(self) -> bool:
        return True

    def update_account(self) -> bool:
        return True

    def get_user_infos(self, user_id) -> List[tuple]:
        pass

    def delete_account(self) -> bool:
        return True
    
    def login(self) -> bool:
        return True
