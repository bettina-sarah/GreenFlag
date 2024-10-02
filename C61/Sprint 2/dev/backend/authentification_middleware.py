from utility_functions import requires_token
from crypt_keeper import CryptKeeper
# decorator

class AuthentificationMiddleware:
    def __init__(self) -> None:
        pass
    
    def check_session_validity(self) -> bool:
        crypt = CryptKeeper
        reponse = crypt.encode('hello')
        
        # ou... CryptKeeper.encore()
    
