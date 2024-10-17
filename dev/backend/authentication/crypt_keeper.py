
# ? peut etre une classe abstraite et utilisé genre CryptKeeper.encode() 
# dans middleware
# pip install pyjwt
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
        pass
    
    def decode(self,token: str) -> str:
        try:
            decoded_jwt = jwt.decode(token, "secret", algorithms=["HS256"])
            return decoded_jwt
        except jwt.ExpiredSignatureError:
            print("expired")
        except jwt.DecodeError as e:
            print(e)
    

    def encode(self,json_information) -> str:
        final_json = self.expiry_date(json_information)  
        encoded_jwt = jwt.encode(final_json, "secret", algorithm="HS256")
        return encoded_jwt
    
    def expiry_date(self, json):
        current_timestamp = int(time.time())
        # 2 heures
        expiry_timestamp = current_timestamp + 7200
        json['exp'] = expiry_timestamp
        return json

    def validate_jwt(self,token) -> bool:
        try:
            header, payload, signature = self.validate_format(token)
            decoded_header = self.decode_header(header)
            if self.validate_header(decoded_header):
                decoded_payload = self.decode(payload)
                if decoded_payload is not None:  # Check if the payload was valid
                    return True
                return True
        except Exception as e:
            print(e)
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
        header_data = json.loads(header)
        known_algorithms = ['HS256', 'RS256']  # Example known algorithms
        known_types = ['JWT']
    
        if header_data.get('typ') not in known_types or header_data.get('alg') not in known_algorithms:
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
    print(result)
    print(crypt.validate_jwt(result))
    # decoded = crypt.decode(result)
    # print(decoded)
    
    

