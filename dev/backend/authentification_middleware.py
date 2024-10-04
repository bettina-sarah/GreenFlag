from utility_functions import requires_token
from crypt_keeper import CryptKeeper


class AuthenticationMiddleware:
    def __init__(self) -> None:
        pass
    
    def login(self) -> bool:
        crypt = CryptKeeper
        reponse = crypt.encode('hello')
        
        # ou... CryptKeeper.encore()
    
