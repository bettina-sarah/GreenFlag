
# ? peut etre une classe abstraite et utilisé genre CryptKeeper.encode() 
# dans middleware
# pip install pyjwt
import json
import jwt
from datetime import datetime, timezone
import time

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
        # add expiry date
        final_json = self.expiry_date(json_information)  
        encoded_jwt = jwt.encode(final_json, "secret", algorithm="HS256")
        return encoded_jwt
    
    def expiry_date(self, json):
        current_timestamp = int(time.time())
        # 2 heures
        expiry_timestamp = current_timestamp + 7200
        json['exp'] = expiry_timestamp
        return json
    
    
if __name__ == "__main__":
    crypt = CryptKeeper()
    jsonn = {"some": "payload"}
    result = crypt.encode(jsonn)
    print(result)
    decoded = crypt.decode(result)
    print(decoded)

