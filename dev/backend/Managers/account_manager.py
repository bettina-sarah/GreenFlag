
from DAOs.account_dao import AccountDAO
#from account_dao import AccountDAO
#from flask import jsonify
from DAOs.photo_lmdb_dao import PhotoDAO


class AccountManager:
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
        email = data.get('email')
        # normally here we get token or verify it
        params = (email,)
        try:
            response = AccountDAO.get_profile(params)
            return response
                # email sequence here
        except Exception as error:
            print(error)
            print('account manager')
            return False
    
    @staticmethod
    def modify_profile(data) -> bool:

        first_name = data.get('firstname')
        last_name = data.get('lastname')
        email = data.get('email')
        password = data.get('password')
        params = (first_name, last_name, email, password)

        try:
            response = AccountDAO.modify_profile(params)
            return response
                # email sequence here
        except Exception as error:
            print(error)
            print('account manager')
            return False

    @staticmethod
    def modify_photos(files, info=None) -> bool:

        #token = info.get('token')
        # we verify if token is valid here ... and return right user id to put in params !
        user_id = '11'

        # by now we assume Frontend knows which photos were changed ??? overwrites them all ?
        try:
            images = files.get('image')
            print(images)
            # images = files.get('image').getlist()
        except Exception as error:
            print(error)
            return False
        photo_dao = PhotoDAO()
        keys = photo_dao.add_photos(files)

        params = [user_id] + keys
        params = tuple(params)
        try:
            response = AccountDAO.modify_photos(params)
            return response
                # email sequence here
        except Exception as error:
            print(error)
            print('account manager')
            return False
