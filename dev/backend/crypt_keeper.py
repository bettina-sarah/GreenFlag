from abc import ABC
# ? peut etre une classe abstraite et utilisé genre CryptKeeper.encode() 
# dans middleware


class CryptKeeper(ABC):
    def __init__(self) -> None:
        pass
    
    @staticmethod
    def decode(a: str) -> str:
        # or a list of strings
        pass

    @staticmethod
    def encode(a: str) -> str:
        pass
    
