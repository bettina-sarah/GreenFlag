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
        is_valid, user_id = cryptkeeper.decode(token)
        if isinstance(is_valid, bool):
            return is_valid, user_id
        # we generate a new token if token is expired OR almost expiring!!
        new_token = self.generate_token(user_id)
        print('new token: ', new_token)
        return new_token, user_id

    def generate_token(self, user_id:str) -> str:
        cryptkeeper = CryptKeeper()
        encoded_token = cryptkeeper.encode(user_id)
        return encoded_token

    

