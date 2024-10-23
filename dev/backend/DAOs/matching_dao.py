from DAOs.dao import DAO
from typing import List

class MatchingDAO(DAO):

    @staticmethod
    def get_suggestions(user_id)-> List[tuple]: # return not good? more dcomplex
        
        return []

    @staticmethod
    def update_suggestion() -> bool:
        return True

    @staticmethod
    def create_matches(matches:list) -> bool:
        return True

    @staticmethod
    def get_matches(user_id) -> bool:
        pass

    @staticmethod
    def update_matches() -> bool:
        pass

    @staticmethod
    def get_user_infos(user_id) -> List[tuple]:
        pass

    @staticmethod
    def flag_user(user_id, reason) -> bool:
        MatchingDAO.unmatch(user_id)
        params = (reason, user_id)
        return True

    @staticmethod
    def unmatch(user_id) -> bool:
        return True
