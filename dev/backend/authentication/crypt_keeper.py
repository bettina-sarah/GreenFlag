'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : crypt_keeper.py
Created By  : Bettina-Sarah Janesch
About       : Cette classe gère l'encodage et le décodage de tokens JWT (JSON Web 
              Tokens), avec des mécanismes pour valider leur format, vérifier leur 
              expiration et garantir leur intégrité en utilisant une clé secrète. 
              Elle fournit des méthodes pour encoder un token avec une date 
              d'expiration configurable, décoder un token pour extraire les informations 
              utilisateur et valider si le token est toujours valide ou expiré.
====================================================================================
------------------------------------------------------------------------------------
'''

import json
from jwt import PyJWT
import time
import base64
import logging

class CryptKeeper:
    def __init__(self) -> None:
        self.__key = "secret"
        self.__expiry_time = 1800  # 30 mins * 60 sec = 1800 for tests  | should be 150 so 2.5mins 
    
    def decode(self,token: str) -> str:
        logging.critical(f"received token:{token}")
        jwt_instance = PyJWT()
        if self.validate_jwt(token):
            try:
                decoded_jwt = jwt_instance.decode(token, self.__key, algorithms=["HS256"],
                                        audience="GreenFlag frontend", issuer="GreenFlag flask server")
                is_valid = self.check_expiry_date(decoded_jwt['exp'], decoded_jwt['sub'])
                return (is_valid, decoded_jwt['sub'])
            except Exception as e:
                logging.error(f"token expired: {e}")
                try:
                    decoded_jwt = jwt_instance.decode(token, self.__key, algorithms=["HS256"], audience="GreenFlag frontend",
                                              issuer="GreenFlag flask server", options={"verify_exp": False} )
                    return False, decoded_jwt['sub']
                except Exception as e:
                    logging.error(f'Error: {e}')
        return None
    
    def check_expiry_date(self, expiry_date, user_id = None):
        current_timestamp = int(time.time())
        remaining_time = expiry_date - current_timestamp
        logging.warning(f'remaining time: {remaining_time} seconds')
        if expiry_date > current_timestamp:
            if remaining_time <= 120:
                return "expiring soon"
            return True
        return False
        

    def encode(self,user_id) -> str:
        payload = {
            "sub": user_id,
            "iss": "GreenFlag flask server",
            "aud": "GreenFlag frontend"
                }       
        jwt_instance = PyJWT()
        final_json = self.expiry_date(payload)  
        encoded_jwt = jwt_instance.encode(final_json, self.__key, algorithm="HS256")
        logging.warn(f'encoded jwt: {encoded_jwt}')
        return encoded_jwt
    
    def expiry_date(self, json):
        current_timestamp = int(time.time())
        # 2 hours
        expiry_timestamp = current_timestamp + self.__expiry_time
        json['exp'] = expiry_timestamp
        return json

    def validate_jwt(self,token) -> bool:
        try:
            header, payload, signature = self.validate_format(token)
            decoded_header = self.decode_header(header)
            if self.validate_header(decoded_header):
                return True
        except Exception as e:
            logging.error(f'error in validate jwt: {e}')
        return False
        
    def validate_format(self,token) -> bool:
        parts = token.split('.')
        if len(parts) == 3:
            return parts
        return False

    def decode_header(self, header: str) -> dict:
        padding = '=' * (4 - len(header) % 4) if len(header) % 4 else ''
        decoded = base64.urlsafe_b64decode(header + padding).decode('utf-8')
        return json.loads(decoded)

    def validate_header(self,header) -> bool:
        known_algorithms = ['HS256', 'RS256']
        known_types = ['JWT']
        if header.get('typ') not in known_types or header.get('alg') not in known_algorithms:
            return False
        return True
    

