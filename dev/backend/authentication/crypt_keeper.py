import json
import jwt
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

class CryptKeeper:
    def __init__(self) -> None:
        self.__key = "secret"
        self.__expiry_time = 1800 # 30 mins
    
    def decode(self,token: str) -> str:
        print("decoding: ", token)
        if self.validate_jwt(token):
            try:
                decoded_jwt = jwt.decode(token, self.__key, algorithms=["HS256"], audience="GreenFlag frontend", issuer="GreenFlag flask server")
                return self.check_expiry_date(decoded_jwt['exp'])
            except jwt.ExpiredSignatureError:
                print("expired")
            except jwt.DecodeError as e:
                print(f'Decoder Error: ',e)
        return None
    
    def check_expiry_date(self, expiry_date):
        current_timestamp = int(time.time())
        remaining_time = expiry_date - current_timestamp
        print('remaining time: ', remaining_time)
        if expiry_date > current_timestamp:
            if remaining_time <= 150:
                return True
                #make new token and send it to FRONTEND AND DATABASE !
                pass
            return True
        return False
        
        

    def encode(self,user_id) -> str:
        payload = {
  "sub": user_id,
  "iss": "GreenFlag flask server",
  "aud": "GreenFlag frontend"
}
        final_json = self.expiry_date(payload)  
        print('json before encoding', final_json)
        encoded_jwt = jwt.encode(final_json, self.__key, algorithm="HS256")
        print('encoded jwt', encoded_jwt)   
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
            print(f'error in validate jwt:', e)
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
    
    # def validate_payload(self, payload) -> bool:
    #     # Decode Base64URL encoded payload
    #     padding = '=' * (4 - len(payload) % 4) if len(payload) % 4 else ''
    #     decoded_payload = base64.urlsafe_b64decode(payload + padding).decode('utf-8')
    #     payload_data = json.loads(decoded_payload)
        
    #     return True


if __name__ == "__main__":
    crypt = CryptKeeper()
    jsonn = {"some": "payload"}
    result = crypt.encode(jsonn)
    print('encoded:', result)
    decode = crypt.decode(result)
    print('decoded', decode)
    # decoded = crypt.decode(result)
    # print(decoded)
    
    

