import json
from jwt import PyJWT
from datetime import datetime, timezone
import time
import base64

''' JWT:   
[header].[payload].[signature]
HEADER:
 {
    "typ":"JWT",
    "alg":"HS256" - decode algo
 }
 
 if alg = HS256 ... decode
 
 Payload:
{
  "id" : 123456789,
  "name" : "Joseph"
  "password" : "1234"
  "date" : 
}

Secret: GeeksForGeeks



Deciding where to keep JWT in HTTP Requests: FRONTEND - IN authorization header
'''

# Validating JWT
'''
Simply decoding and reading a JWT is not enough; it’s essential to validate it. Here are some standard validation checks:

1. Verifying Format:
Ensure the JWT has three parts separated by dots (.).
Check that the data is Base64URL encoded.
Verify that the header and payload are valid JSON objects.
2. Validating the Header:
Check for known values in the alg and typ fields.
Verify that the token is signed using a known key (check the kid field).
Confirm that the key is suitable for the specified algorithm.
3. Validating the Payload:
Ensure the token is not expired (exp).
Confirm that your application is the intended recipient (aud).
Verify that the token is issued by a trusted source (iss).

'''

import logging
import coloredlogs

level_styles = {
    'debug': {'color': 'blue'},
    'info': {'color': 'green'},
    'warning': {'color': 'yellow'},
    'error': {'color': 'red'},
    'critical': {'color': 'magenta'}
}


coloredlogs.install(level='DEBUG', level_styles=level_styles)

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
        # 2 heures
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
        # Decode Base64URL encoded header
        padding = '=' * (4 - len(header) % 4) if len(header) % 4 else ''
        decoded = base64.urlsafe_b64decode(header + padding).decode('utf-8')
        return json.loads(decoded)

    def validate_header(self,header) -> bool:
        # header_data = json.loads(header)
        known_algorithms = ['HS256', 'RS256']  # Example known algorithms
        known_types = ['JWT']
    
        if header.get('typ') not in known_types or header.get('alg') not in known_algorithms:
            return False
        return True
    

