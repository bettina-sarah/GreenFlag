from user import User
from util_classes.observer import Observer
from DAOs.matching_dao import MatchingDAO

class MatchingManager(Observer):
    def __init__(self) -> None:
        self.suggestions = [] # Users
        self.matches = []

    def process(self) -> bool: #observer method
        pass

    def check_suggestion_for_match(self, suggestions:list) -> list:
        return []

    def create_match(self, matches:list) -> bool:
        pass

    def flag_user(self, user_id) -> bool:
        return True
    
    # do we want to be able to unflag someone?

    def unmatch(self, user_id) -> bool:
        return True


    
