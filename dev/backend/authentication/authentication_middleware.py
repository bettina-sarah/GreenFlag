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
        cryptkeeper = CryptKeeper()
        token_validity = cryptkeeper.decode(token)
        return token_validity  

    def generate_token(self, user_id:str) -> str:
        cryptkeeper = CryptKeeper()
        encoded_token = cryptkeeper.encode(user_id)
        print('encoded really?',encoded_token)
        return encoded_token

    

