from DAOs.account_dao import AccountDAO
#from account_dao import AccountDAO
from DAOs.photo_lmdb_dao import PhotoDAO
from datetime import datetime
import mimetypes
from PIL import Image


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
        id = data.get('id')
        # normally here we get token or verify it
        params = (id,)
        responses = []
        try:
            profile_response = AccountDAO.get_profile(params)
            if profile_response:
                responses.append(profile_response)
                photokeys_response = AccountManager.get_photo_keys(id)
                if photokeys_response:
                    responses.append(photokeys_response)
                    return tuple(responses)
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
    def update_preferences(data) -> bool:
        columns, values = AccountManager.validate_preference_fields(data)

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
    def get_photo_keys(id) -> bool:
        # tokens ... 
        # user_id = '11'
        params = (id,)
        try:
            encryption_keys = AccountDAO.get_photos(params)
            return encryption_keys
        except Exception as error:
            print(error)
    
    
    
    @staticmethod
    def get_photo(data) -> bool:
        # key = data.get('key')
        print('in get photo manager: data is ', data)
        photo_dao = PhotoDAO()
        try:
            photo = photo_dao.get_photo(data)
            mime_type = AccountManager.guess_mime_type(photo)
            return photo, mime_type
        except Exception as error:
            print(error)
            print('account manager')
            
    @staticmethod
    def guess_mime_type(photo):
        try:
            image = Image.open(photo)
            image_format = image.format.lower()  # Example: 'jpeg', 'png'
        except Exception as e:
            print(e)

        # Reset the BytesIO pointer to the beginning
        photo.seek(0)

        # Determine the correct MIME type based on the image format
        mime_type = f"image/{image_format}" if image_format in ['jpeg', 'png', 'gif', 'bmp', 'webp'] else 'application/octet-stream'
        return mime_type
    
    
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
