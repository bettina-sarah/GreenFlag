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
    def create_suggestions(user_id:int) -> bool:
        """
        Create suggestions for a given user_id, given that the user has not interacted with them before.
        Returns True if the suggestions were created successfully, False otherwise
        """
        try:
            response = MatchingDAO.get_eligible_members(user_id)
            if response:
                prospects_ids = MatchingManager.find_suggestions(user_id,response)
                
            if prospects_ids:
                response_2 = MatchingDAO.create_suggestions(user_id,prospects_ids)
                
            if response:
                return response_2
            
        except Exception as error:
            print(error)
            
    @staticmethod
    def get_suggestions(user_id:int) -> bool:
        try:
            response = MatchingDAO.get_suggestions(user_id)
            if response:
                return response
            
        except Exception as error:
            print(error)

    @staticmethod
    def flag_user(user_id:int, flagged_id:int, reason:str) -> bool:
        """
        Flag a user, given the user_id of the user doing the flagging, the user_id of the user being flagged, and the reason for the flagging.
        Returns True if the flagging was successful, False otherwise
        """
        try:
            response = MatchingDAO.flag_user(user_id,flagged_id,reason)
            if response:
                return response
        
        except Exception as error:
            print(error)        

    @staticmethod
    def unmatch(user_id:int, unmatched_id:int) -> bool:
        try:
            response = MatchingDAO.unmatch(user_id,unmatched_id)
            if response:
                return response
        except Exception as error:
            print(error)
    
    @staticmethod
    def find_suggestions(user_id:int, members_activities:int) -> list[int]:
        """
        Find suggestions for a given user_id, given a list of members and their respective activities.
        Returns a list of user_ids of the suggestions.
        """
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