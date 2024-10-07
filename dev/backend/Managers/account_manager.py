from account_dao import AccountDAO
from abc import ABC, abstractmethod
from flask import jsonify

class AccountManager(ABC):
    def __init__(self) -> None:
        pass
    
    @staticmethod
    def login(request) -> bool:
        data = request
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