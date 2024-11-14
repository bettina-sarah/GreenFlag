from authentication.crypt_keeper import CryptKeeper
from functools import wraps


# def requires_token(my_function) -> function: 
#     @wraps(my_function)
#     def decorated(*args, **kwargs):
#         print('i am wrapped')
#             # retour des plusieurs param dans fonction
#         return my_function(*args,**kwargs)
#     return decorated


class AuthenticationMiddleware:
    def __init__(self) -> None:
        pass
    
    # @requires_token
    def check_session_validity(self, token:str) -> bool:
        
        decoded_token = CryptKeeper.decode(token)

        # comment encode est utilisé? 
        if decoded_token == "session_valid":
            return True

        return False    

    def generate_token(self, user_id:str) -> str:
        cryptkeeper = CryptKeeper()
        encoded_token = cryptkeeper.encode(user_id)
        print('encoded really?',encoded_token)
        return encoded_token

    

