from user import User
from util_classes.observer import Observer
from DAOs.matching_dao import MatchingDAO

class MatchingManager(Observer):
    suggestions = [] # Users
    matches = []

    @staticmethod
    def process() -> bool: #observer method
        pass
    
    @staticmethod
    def get_suggestions():
        try:
            user_id = '11'
            response = MatchingDAO.get_suggestions(user_id)
            if response:
                return response
            
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


    
