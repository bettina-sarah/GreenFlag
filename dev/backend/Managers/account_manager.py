'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : account_manager.py
Created By  : Bettina-Sarah Janesch
About       : Classe qui gère les comptes utilisateurs et les photos de profil en 
              interagissant avec les DAO pour des opérations comme la connexion, 
              l'inscription, la mise à jour des données, la gestion des préférences,
              et le nettoyage des données recus du frontend.
====================================================================================
------------------------------------------------------------------------------------
'''

from DAOs.account_dao import AccountDAO
from DAOs.photo_lmdb_dao import PhotoDAO
from datetime import datetime
from PIL import Image
import logging


class AccountManager:
    def __init__(self) -> None:
        pass
    
    @staticmethod
    def login(data) -> bool:
        email = data.get('email')
        password = data.get('password')
        params = (email, password)
        try:
            response = AccountDAO.login(params)
            json_response = {'id': response[0][0], 'profile_completed': response[0][1]}
            return json_response
        except Exception as error:
            print(__class__.__name__, error)
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
        except Exception as error:
            print(__class__.__name__, error)
            return False
    
    @staticmethod
    def modify_password(data)-> bool:
        email = data.get('email')
        password = data.get('password')
        newpassword = data.get('newpassword')
        
        verify_params = (email, password)
        response = AccountDAO.verify_password(verify_params)
        
        if response:
            id = response[0]
            modify_params = (newpassword,id)
            response = AccountDAO.modify_password(modify_params)
            if response:
                return response
            
        return False

    @staticmethod
    def update_localisation(data) -> bool:
        id = data.get('id')
        lat = data.get('lat')
        long = data.get('long')
        if id != None:
            params = (lat, long, int(id))
            response = AccountDAO.update_localisation(params)
            return response
        else:
            return False
        
    @staticmethod
    def get_location(data) -> bool:
        id = data.get('id')
        suggestion_id = data.get('suggestion_id')
        params = (int(id),suggestion_id)
        response = AccountDAO.get_location(params)
        return response if response else False
    

    @staticmethod
    def save_token(id, token) -> bool:
        params = (token, id)
        try:
            response = AccountDAO.save_token(params)
            return response
        except Exception as error:
            print(__class__.__name__, error)
            
    @staticmethod
    def does_token_exist(user_id, token) -> bool:
        params = (user_id, token)
        try:
            response = AccountDAO.does_token_exist(params)
            return response
        except Exception as error:
            print(__class__.__name__, error)
            
    @staticmethod
    def complete_profile(data) -> bool:
        id = data.get('id')
        params = (id,)
        try:
            response = AccountDAO.complete_profile(params)
            return response
        except Exception as error:
            print(__class__.__name__, error)
            return False

    @staticmethod
    def confirm_email(data) -> bool:
        id = data.get('id')
        params = (id,)
        try:
            response = AccountDAO.confirm_email(params)
            return response
        except Exception as error:
            print(__class__.__name__, error)
            return False
        
    @staticmethod
    def confirm_fake(data) -> bool:
        id = data.get('id')
        params = (id,)
        try:
            response = AccountDAO.confirm_fake(params)
            return response
        except Exception as error:
            print(__class__.__name__, error)
            return False
        

    @staticmethod
    def delete_account(data) -> bool:
        email = data.get('email')
        password = data.get('password')
        params = (email, password)
        
        try:
            response = AccountDAO.delete_account(params)
            return response
        except Exception as error:
            print(__class__.__name__, error)
            return False
    

    @staticmethod
    def get_profile(data: any) -> bool:
        if not isinstance(data, int):
            id = data.get('id')
        else:
            id = data
        responses = {}
        try:
            profile_response = AccountDAO.get_user_infos(id)
            if profile_response:
                jsonified_response = AccountManager.jsonify_response(profile_response)
                responses["profile_info"] = jsonified_response
                photokeys_response = AccountManager.get_photo_keys(id)
                if photokeys_response:
                    responses["photo_keys"] = photokeys_response
                else:
                    responses["photo_keys"] = None
            return responses
        except Exception as error:
            print(__class__.__name__, error)
            return False
        
    
    @staticmethod
    def jsonify_response(list):
        try:
            result=list[0]
            profile_data= {  
            "basic_info": {
            "first_name": result[1],
            "age": result[3],
            "city": result[7],
            "location": 10
                },
            "relationship":result[8],
            "wants_kids": result[6],
            "hobby_array": result[9],
            "bio": result[4]}
            return profile_data
        except Exception as error:
            print(__class__.__name__, error)
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
        except Exception as error:
            print(__class__.__name__, error)
            return False

    @staticmethod
    def update_preferences(data) -> bool:
        columns, values = AccountManager.validate_preference_fields(data.get('info'))

        user_id = data.get('id')
        try:
            response = AccountDAO.update_preferences(columns, values, user_id)
            return response
        except Exception as error:
            print(__class__.__name__, error)
            return False
    
    @staticmethod
    def validate_preference_fields(data):
        columns = []
        values = []
        for key, value in data.items():
            if key == 'date_of_birth':
                dt = datetime.fromisoformat(value[:-1])
                value = dt.date()
            if key == 'preferred_genders':
                formatted_genders = '{' + ','.join(value) + '}'
                value = formatted_genders
            columns.append(key)
            values.append(value)
        return columns, values

    @staticmethod
    def modify_photos(user_id, files=None, info=None, keys=None) -> bool:
        if files:
            photo_dao = PhotoDAO()
            keys = photo_dao.add_photos(files)
        else:
            keys = keys
        formatted_keys = '{' + ','.join(keys) + '}'
        params = (user_id, formatted_keys)
        try:
            response = AccountDAO.add_photos(params)
            return response
        except Exception as error:
            print(__class__.__name__, error)
            return False
    
    @staticmethod
    def get_photo_keys(id) -> bool:
        params = (id,)
        try:
            encryption_keys = AccountDAO.get_photos(params)
            return encryption_keys
        except Exception as error:
            print(__class__.__name__, error)
    
    
    @staticmethod
    def get_photo(data) -> bool:
        photo_dao = PhotoDAO()
        try:
            photo = photo_dao.get_photo(data)
            mime_type = AccountManager.guess_mime_type(photo)
            return photo, mime_type
        except Exception as error:
            print(__class__.__name__, error)
            
    @staticmethod
    def guess_mime_type(photo):
        try:
            image = Image.open(photo)
            image_format = image.format.lower()
        except Exception as error:
            print(__class__.__name__, error)
        # Reset the BytesIO pointer to the beginning
        photo.seek(0)
        # Determine the correct MIME type based on the image format
        mime_type = f"image/{image_format}" if image_format in ['jpeg', 'png', 'gif', 'bmp', 'webp'] else 'application/octet-stream'
        return mime_type
    
    
    @staticmethod
    def update_hobbies(data) -> bool:
        hobbies = []
        user_id = data.get('id')
        for key, value in data.get('hobbies').items():
            if value:
                hobbies.append(key)
        formatted_hobbies = '{' + ','.join(hobbies) + '}'
        params = (user_id,formatted_hobbies)

        try:
            response = AccountDAO.update_hobbies(params)
            return response
        except Exception as error:
            print(__class__.__name__, error)
            return False
