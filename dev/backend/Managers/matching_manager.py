from user import User
from util_classes.observer import Observer
from DAOs.matching_dao import MatchingDAO
from Algorithms.algo_strategy import AlgoContext
from Algorithms.meanshift import MeanShift

NUMBER_ACTIVITIES = 20


class MatchingManager(Observer):
    suggestions = [] # Users
    matches = []

    @staticmethod
    def process() -> bool: #observer method
        pass
    
    @staticmethod
    def get_eligible_members():
        try:
            user_id = '1'
            response = MatchingDAO.get_suggestions(user_id)
            if response:
                MatchingManager.find_suggestions(user_id,response)
            
        except Exception as error:
            print(error)

    @staticmethod
    def check_suggestion_for_match(suggestions:list) -> list:
        return []

    @staticmethod
    def create_match(matches:list) -> bool:
        pass

    @staticmethod
    def flag_user(user_id) -> bool:
        return True
    
    # do we want to be able to unflag someone?

    @staticmethod
    def unmatch(user_id) -> bool:
        return True


    
    @staticmethod
    def find_suggestions(user_id, members_activities):
        counter = 0
        members_index = []
        data = np.zeros((len(members_activities) - 1, NUMBER_ACTIVITIES))
        for member in members_activities:
            if member[0] != user_id:
                members_index.append(member[0])
                
                data[counter,member[1]] += 1
                counter += 1
        
        if np.sum(data) > 0:
            Algo = AlgoContext(MeanShift(0.3,100,0.001))
        
            Algo.fit(data)
            