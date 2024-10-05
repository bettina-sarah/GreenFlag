from utility_functions import requires_token
from crypt_keeper import CryptKeeper


class AuthenticationMiddleware:
    def __init__(self) -> None:
        pass
    
    @requires_token
    def check_session_validity(self, token:str) -> bool:
        
        decoded_token = CryptKeeper.decode(token)

        # comment encode est utilisé? 
        if decoded_token == "session_valid":
            return True

        return False    
