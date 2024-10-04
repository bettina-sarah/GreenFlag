from utility_functions import requires_token
from crypt_keeper import CryptKeeper
# decorator

class AccountManager:
    def __init__(self) -> None:
        pass
    
    def login(self) -> bool:
        pass
    
    @requires_token
    def modify_profile(self) -> bool:
        pass
    
    @requires_token
    def modify_profile(self) -> bool:
        pass
    
    def delete_account(self) -> bool:
        pass