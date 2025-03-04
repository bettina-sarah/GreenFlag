'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : matching_dao.py
Created By  : Vincent Fournier
About       : Contient les méthodes pour gérer les données de correspondance, y compris
              la récupération de membres éligibles, la création et la mise à jour des 
              suggestions, ainsi que la gestion des correspondances et des activités 
              de l'utilisateur.
====================================================================================
------------------------------------------------------------------------------------
'''

from DAOs.dao import DAO
from Managers.account_manager import AccountManager
from typing import List

class MatchingDAO(DAO):

    @staticmethod
    def get_eligible_members(user_id: int) -> List[tuple]:
        query = 'SELECT * FROM find_eligible_members_activities(%s);'
        params = (user_id,)
        reponse = MatchingDAO._prepare_statement('select', query, params)
        if reponse:
            return reponse
        return False

    @staticmethod
    def create_suggestions(user_id: int, prospect_ids: list[int]) -> bool:
        query = 'SELECT create_suggestions(%s,%s);'
        params = (user_id, prospect_ids)
        response = MatchingDAO._prepare_statement('select', query, params)
        if response:
            return response
    
    @staticmethod
    def get_suggestions(user_id: int) -> List[dict]:
        query = "SELECT id, member_id_2 FROM suggestion WHERE member_id_1 = %s and situation = 'pending' LIMIT 5;" # LIMIT 20
        params = (user_id,)
        response = MatchingDAO._prepare_statement('select', query, params)
        if response:
            suggestions = []
            for suggestion in response:
                infos = AccountManager.get_profile(suggestion[1])
                sugg = {
                    "suggestion_id": suggestion[0],
                    "user_infos": infos}
                suggestions.append(sugg)
            
            return suggestions
        return False
    
    @staticmethod
    def update_suggestion_from_user_ids(user_id: int, prospect_id: int, situation: str) -> bool:
        query = 'UPDATE suggestion SET situation = %s WHERE member_id_1 = %s and member_id_2 = %s;'
        params = (situation, user_id, prospect_id)
        response = MatchingDAO._prepare_statement('update', query, params)
        if response:
            return response
        return False

    @staticmethod
    def update_suggestion(params: tuple[str,int]) -> bool:
        query = 'UPDATE suggestion SET situation = %s WHERE id = %s'
        response = MatchingDAO._prepare_statement('update', query, params)
        if response:
            return response
        return False

    @staticmethod
    def get_matches(user_id: int) -> bool:
        query = 'SELECT m.chatroom_name, s.member_id_2 FROM member_match as m INNER JOIN suggestion as s ON m.suggestion_id = s.id WHERE member_id_1 = %s;'
        params = (user_id,)
        response = MatchingDAO._prepare_statement('select', query, params)
        if response:
            return response
        return False
    
    @staticmethod
    def get_user_activities(user_id: int):
        query = "SELECT activities_id FROM member_activities_view WHERE member_id=%s"
        params = (user_id,)
        response = MatchingDAO._prepare_statement('select', query, params)
        if response:
            return response[0][0]
        return False

    @staticmethod
    def unmatch(user_id: int, unmatched_id: int) -> bool:
        query = "SELECT * FROM unmatch(%s,%s);"
        params = (user_id, unmatched_id)
        response = MatchingDAO._prepare_statement('select', query, params)
        if response:
            return response
        return False
    
    @staticmethod
    def get_flag_count(user_id: int) -> int:
        query = 'SELECT COUNT(*) FROM flagged WHERE member_id = %s'
        params = (user_id,)
        response = MatchingDAO._prepare_statement('select', query, params)
        if response:
            return response[0][0]
        return 0