from dao import DAO
from types import List, Tuple

class StatsDAO(DAO):
    def __init__(self) -> None:
        pass

    @staticmethod   
    def create_connection(params: dict ) -> None:
        pass    

    # all dao methods need to be redefined here?

    def get_data(self) -> List[Tuple[str, int]]:
        pass