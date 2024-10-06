from dao import DAO
from types import List

class MatchingDAO(DAO):
    def __init__(self) -> None:
        pass

    @staticmethod
    def create_connection(params: dict) -> None:
        pass

    def get_suggestions(self, user_id)-> List[tuple]: # return not good? more dcomplex
        return []

    def update_suggestion(self) -> bool:
        return True

    def create_matches(self, matches:list) -> bool:
        return True

    def get_matches(self, user_id) -> bool:
        pass

    def update_matches(self) -> bool:
        pass

    def get_user_infos(self, user_id) -> List[tuple]:
        pass

    def flag_user(self, user_id, reason) -> bool:
        self.unmatch(user_id)
        return True

    def unmatch(self, user_id) -> bool:
        return True


