from DAOs.dao import DAO

from typing import List
import numpy as np



class MatchingDAO(DAO):

    @staticmethod
    def get_eligible_members(user_id)-> List[tuple]: # return not good? more dcomplex
        query = 'SELECT * FROM find_eligible_members_activities(%s)'
        params = (user_id,)
        reponse = MatchingDAO._prepare_statement('select',query,params)
        if reponse:
            return reponse
        return False

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
        query = "SELECT * from get_user_info(%s)"
        params = (user_id,)
        response = MatchingDAO._prepare_statement("select",query,params)
        if response:
            return response
        return False

    @staticmethod
    def flag_user(user_id, reason) -> bool:
        MatchingDAO.unmatch(user_id)
        params = (reason, user_id)
        return True

    @staticmethod
    def unmatch(user_id) -> bool:
        return True


   
        
        