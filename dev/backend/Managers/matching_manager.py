from user import User
from DAOs.matching_dao import MatchingDAO
from Algorithms.algo_strategy import AlgoContext
from Algorithms.meanshift import MeanShift
import numpy as np

NUMBER_ACTIVITIES = 20

# observer inherit ?

class MatchingManager():
    suggestions = [] # Users
    matches = []
    
    @staticmethod
    def create_suggestions(user_id) -> bool:
        try:
            response = MatchingDAO.get_eligible_members(user_id)
            response_2 = None
            prospects_ids = None
            if response:
                prospects_ids = MatchingManager.find_suggestions(user_id,response)
                
            if prospects_ids:
                response_2 = MatchingDAO.create_suggestions(user_id,prospects_ids)
                
            if response and response_2:
                return response_2
            
        except Exception as error:
            print(error)
    
    @staticmethod
    def get_suggestions(data:dict) -> bool:
        try:
            user_id = data.get("id")
            response = MatchingDAO.get_suggestions(user_id)
            
            if not response:
                create = MatchingManager.create_suggestions(user_id)
                print("create : ", create)
                response = MatchingDAO.get_suggestions(user_id)
                return response
            elif response:
                return response
            
        except Exception as error:
            print(error)
            
            
    @staticmethod
    def update_suggestion(data:dict) -> bool:
        try:
            suggestion_id = data.get("suggestion_id")
            situation = data.get("choice")
            params = (situation, suggestion_id)
            response = MatchingDAO.update_suggestion(params)
            if response:
                return response
        except Exception as error:
            print(error)

    @staticmethod
    def flag_user(data:dict) -> bool:
        try:
            user_id = data.get("id")
            flagged_id = data.get("flagged_id")
            reason = data.get("reason")
            response = MatchingDAO.flag_user(user_id,flagged_id,reason)
            if response:
                return response
        
        except Exception as error:
            print(error)        

    @staticmethod
    def unmatch(data:dict) -> bool:
        try:
            user_id = data.get("id")
            unmatched_id = data.get("unmatched_id")
            response = MatchingDAO.unmatch(user_id,unmatched_id)
            if response:
                return response
        except Exception as error:
            print(error)
    
    @staticmethod
    def find_suggestions(user_id:int, members:int) -> list[int]:
        user_activities = np.zeros((1, NUMBER_ACTIVITIES))
        index_counter = 0
        members_index = []
        data = np.zeros((len(members), NUMBER_ACTIVITIES))
        
        if len(members) <= 8:
            prospects_ids = []
            for member in members:
                prospects_ids.append(member[0])
            return prospects_ids
        
        
        user_data = MatchingDAO.get_user_activities(user_id)
        user_data[:] = [x - 1 for x in user_data[:]]
        user_activities[0,user_data[0]] += 1
        
        for member in members:
            if member[0] != user_id:
                member_id, member_activities = member
                members_index.append(member_id)
                member_activities[:] = [x-1 for x in member_activities]
                data[index_counter,member_activities] += 1
                index_counter += 1
        
        if np.sum(data) > 0:
            Algo = AlgoContext(MeanShift(0.3,100,0.001))
        
            Algo.fit(data)
            
            user_label = Algo.predict(user_activities)
        
            labels = Algo.get_labels()
        
            prospects = []
        
            index = 0
            for label in labels:
                if label == user_label:
                    prospects.append(index)
                    
                index += 1
            
            prospects_ids = [members_index[i] for i in prospects]
            
            return prospects_ids