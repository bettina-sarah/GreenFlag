from abc import ABC
# ? peut etre une classe abstraite et utilisé genre CryptKeeper.encode() 
# dans middleware


class CryptKeeper(ABC):
    def __init__(self) -> None:
        pass
    
    @staticmethod
    def decode(token: str) -> str:
        # or a list of strings
        pass

    @staticmethod
    def encode(token: str) -> str:
        pass
    
