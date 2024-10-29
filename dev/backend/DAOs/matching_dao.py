from DAOs.dao import DAO

from typing import List
import numpy as np



class MatchingDAO(DAO):

    @staticmethod
    def get_eligible_members(user_id:int)-> List[tuple]: # return not good? more dcomplex
        query = 'SELECT * FROM find_eligible_members_activities(%s);'
        params = (user_id,)
        reponse = MatchingDAO._prepare_statement('select',query,params)
        if reponse:
            return reponse
        return False

    @staticmethod
    def create_suggestion(user_id:int, prospect_ids:list[int]) -> str:
        query = 'SELECT create_suggestion(%s,%s);'
        params = (user_id,prospect_ids)
        response = MatchingDAO._prepare_statement('select',query,params)
        if response:
            return response
    
    @staticmethod
    def get_suggestions(user_id:int) -> List[tuple]:
        query = 'SELECT id, member_id_2 FROM suggestion WHERE member_id_1 = %s and situation = "pending"'
        params = (user_id,)
        response = MatchingDAO._prepare_statement('select',query,params)
        if response:
            return response
        return False
    
    @staticmethod
    def update_suggestion(user_id,prospect_id,situation) -> bool:
        query = 'UPDATE suggestion SET situation = %s WHERE member_id_1 = %s and member_id_2 = %s'
        params = (situation,user_id,prospect_id)
        # query = 'UPDATE suggestion SET situation = %s WHERE id = %s'
        # params = (situation,suggestion_id)
        response = MatchingDAO._prepare_statement('update',query,params)
        if response:
            return response
        return False

    @staticmethod
    def create_matches(matches:list) -> bool:
        pass

    @staticmethod
    def get_matches(user_id) -> bool:
        query = 'SELECT m.chatroom_name, s.member_id_2 suggestion. FROM member_match as m INNER JOIN suggestion as s ON m.suggestion_id = suggestion.id WHERE member_id_1 = %s'
        params = (user_id,)
        response = MatchingDAO._prepare_statement('select',query,params)
        if response:
            return response
        return False

    @staticmethod
    def update_matches() -> bool:
        pass

    @staticmethod
    def get_user_infos(user_id) -> List[tuple]:
        query = "SELECT * from member_activities_view WHERE member_id = user_id"
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


   
        
        