from user import User
from util_classes.observer import Observer
from DAOs.matching_dao import MatchingDAO
from Algorithms.algo_strategy import AlgoContext
from Algorithms.meanshift import MeanShift
import numpy as np

NUMBER_ACTIVITIES = 20


class MatchingManager(Observer):
    suggestions = [] # Users
    matches = []
    
    @staticmethod
    def create_suggestions(data:dict) -> bool:
        try:
            user_id = data.get("id")
            response = MatchingDAO.get_eligible_members(user_id)
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
    def find_suggestions(user_id:int, members_activities:int) -> list[int]:
        user_activities = np.zeros((1, NUMBER_ACTIVITIES))
        counter = 0
        members_index = []
        data = np.zeros((len(members_activities) - 1, NUMBER_ACTIVITIES))
        
        for member in members_activities:
            if member[0] == user_id:
                user_activities[0,member[1]] += 1
            
            if member[0] != user_id:
                members_index.append(member[0])
                
                data[counter,member[1]] += 1
                counter += 1
        
        if np.sum(data) > 0:
            Algo = AlgoContext(MeanShift(0.3,100,0.001))
        
            Algo.fit(data)
            
            user_label = Algo.predict(user_activities)
        
            labels = Algo.get_labels()
        
            prospects = ()
        
            index = 0
            for label in labels:
                if label == user_label:
                    prospects.append(index)
                    
                index += 1
            
            prospects_ids = [members_index[i] for i in prospects]
            
            return prospects_ids