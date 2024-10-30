from DAOs.dao import DAO

from typing import List
import numpy as np



class MatchingDAO(DAO):

    @staticmethod
    def get_eligible_members(user_id:int)-> List[tuple]:
        query = 'SELECT * FROM find_eligible_members_activities(%s);'
        params = (user_id,)
        reponse = MatchingDAO._prepare_statement('select',query,params)
        if reponse:
            return reponse
        return False

    @staticmethod
    def create_suggestions(user_id:int, prospect_ids:list[int]) -> bool:
        query = 'SELECT create_suggestions(%s,%s);'
        params = (user_id,prospect_ids)
        response = MatchingDAO._prepare_statement('select',query,params)
        if response:
            return response
    
    @staticmethod
    def get_suggestions(user_id:int) -> List[tuple]:
        query = "SELECT id, member_id_2 FROM suggestion WHERE member_id_1 = %s and situation = 'pending';"
        params = (user_id,)
        response = MatchingDAO._prepare_statement('select',query,params)
        if response:
            return response
        return False
    
    @staticmethod
    def update_suggestion(user_id:int, prospect_id:int, situation:str) -> bool:
        query = 'UPDATE suggestion SET situation = %s WHERE member_id_1 = %s and member_id_2 = %s;'
        params = (situation,user_id,prospect_id)
        # query = 'UPDATE suggestion SET situation = %s WHERE id = %s'
        # params = (situation,suggestion_id)
        response = MatchingDAO._prepare_statement('update',query,params)
        if response:
            return response
        return False

    @staticmethod
    def get_matches(user_id:int) -> bool:
        query = 'SELECT m.chatroom_name, s.member_id_2 FROM member_match as m INNER JOIN suggestion as s ON m.suggestion_id = s.id WHERE member_id_1 = %s;'
        params = (user_id,)
        response = MatchingDAO._prepare_statement('select',query,params)
        if response:
            return response
        return False

    @staticmethod
    def flag_user(user_id:int,unmatched_id:int, reason:str) -> bool:
        unmatched = MatchingDAO.unmatch(user_id, unmatched_id)
        query = "INSERT INTO flagged (member_id, reporter_id, reason) VALUES(%s,%s,%s);"
        params = (unmatched_id, user_id, reason)
        response = MatchingDAO._prepare_statement('insert',query,params)
        if response and unmatched:
            return response
        return False

    @staticmethod
    def unmatch(user_id:int, unmatched_id:int) -> bool:
        query = "SELECT * FROM unmatch(%s,%s);"
        params = (user_id,unmatched_id)
        response = MatchingDAO._prepare_statement('select',query,params)
        if response:
            return response
        return False