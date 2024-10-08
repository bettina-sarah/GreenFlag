from account_dao import AccountDAO
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
        try:
            response = AccountDAO.login(params)
            return response
            # CREAte token .... & SENT to the front
        except Exception as error:
            print(error)
            return False
    
    @staticmethod
    def create_account(data) -> bool:
        first_name = data.get('firstname')
        last_name = data.get('lastname')
        email = data.get('email')
        password = data.get('password')
        
        params = (first_name, last_name, email, password)

        try:
            response = AccountDAO.create_account(params)
            return response
                # email sequence here
#             la valeur d'une clé dupliquée rompt la contrainte unique « member_email_key »
# DETAIL:  La clé « (email)=(haha@jaja.com) » existe déjà.
        except Exception as error:
            print(error)
            print('account manager')
            return False

    @staticmethod
    def delete_account(data) -> bool:
        email = data.get('email')
        password = data.get('password')
        params = (email, password)
        
        try:
            response = AccountDAO.delete_account(params)
            return response
                # email sequence here
        except Exception as error:
            print(error)
            print('account manager')
            return False
    

    @staticmethod
    def get_profile(data) -> bool:
        pass
    
    @staticmethod
    def modify_profile(data) -> bool:
        pass
    
