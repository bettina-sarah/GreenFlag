from DAOs.account_dao import AccountDAO
#from account_dao import AccountDAO
from DAOs.photo_lmdb_dao import PhotoDAO
from datetime import datetime


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
    
    # {'gender': 'x', 'height': '44', 'religion': 'Christian', 'want_kids': True, 'city': 'Maaa', 'min_age': '24', 'max_age': '57', 'relationship_type': 'shortterm', 'date_of_birth': '2024-10-07T04:00:00.000Z', 'preferred_genders': ['Non-Binary', 'Male']}
    
    @staticmethod
    def update_preferences(data) -> bool:
        columns, values = AccountManager.validate_preference_fields(data)
        # columns = []
        # values = []
        # for key, value in data.items():
        #     # change dob to sql appropriate
        #     if key == 'date_of_birth':
        #         dt = datetime.fromisoformat(value[:-1])  # format is '2024-10-07T04:00:00.000Z' - removes Z and keeps date only
        #         value = dt.date()
        #     if key == 'preferred_genders': # make array into sql appropriate list:
        #         formatted_genders = '{' + ','.join(value) + '}'
        #         value = formatted_genders
        #     columns.append(key)
        #     values.append(value)
        
        # Create a tuple of column-value pairs
        # params = tuple(zip(columns, values))
        
        # obviously fish id from token ... 
        user_id = '11'
        try:
            response = AccountDAO.update_preferences(columns,values, user_id)
            return response
                # email sequence here
        except Exception as error:
            print(error)
            print('account manager')
            return False
    
    @staticmethod
    def validate_preference_fields(data):
        columns = []
        values = []
        for key, value in data.items():
            # change dob to sql appropriate
            if key == 'date_of_birth':
                dt = datetime.fromisoformat(value[:-1])  # format is '2024-10-07T04:00:00.000Z' - removes Z and keeps date only
                value = dt.date()
            if key == 'preferred_genders': # make array into sql appropriate list:
                formatted_genders = '{' + ','.join(value) + '}'
                value = formatted_genders
            columns.append(key)
            values.append(value)
        return columns, values

    @staticmethod
    def modify_photos(files, info=None) -> bool:

        #token = info.get('token')
        # we verify if token is valid here ... and return right user id to put in params !
        user_id = '11'

        # by now we assume Frontend knows which photos were changed ??? overwrites them all ?
        try:
            images = files.get('image')
            # images = files.get('image').getlist()
        except Exception as error:
            print(error)
            return False
        photo_dao = PhotoDAO()
        keys = photo_dao.add_photos(images)
        formatted_keys = '{' + ','.join(keys) + '}'
        params = (user_id,formatted_keys)
        try:
            response = AccountDAO.add_photos(params)
            return response
                # email sequence here
        except Exception as error:
            print(error)
            print('account manager')
            return False
    
    @staticmethod
    def get_photos(data) -> bool:
        user_id = data.get('user_id')
        # tokens ... 
        user_id = '11'
        params = (user_id,)
        photo_dao = PhotoDAO()
        try:
            photos = []
            encryption_keys = AccountDAO.get_photos(params)
            for key in encryption_keys:
                photo = photo_dao.get_photo(key)
                photos.append(photo)
            return photos
        except Exception as error:
            print(error)
            print('account manager')
    
    
    @staticmethod
    def update_hobbies(data) -> bool:
        hobbies = []
        for key, value in data.items():
            if value:
                hobbies.append(key)

        # token verification yo
        user_id = '11'
        # postgres approved way of an array !!
        formatted_hobbies = '{' + ','.join(hobbies) + '}'
        params = (user_id,formatted_hobbies)

        try:
            response = AccountDAO.update_hobbies(params)
            return response
                # email sequence here
        except Exception as error:
            print(error)
            print('account manager')
            return False
