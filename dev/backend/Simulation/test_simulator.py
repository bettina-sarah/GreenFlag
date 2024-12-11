from Simulation.user_factory import UserFactory
from Managers.matching_manager import MatchingManager
from Simulation.user import User
from typing import Set
import random

class TestSimulator:
    def __init__(self) -> None:
        self.users : Set[User] = set()
        self.user_factory = UserFactory("w")
        self.suggestions= set()
    
    # get old users to put in set ? 

    def create_random_users(self, user_amount: int= 100, gender_proportion:list = [0.25,0.25,0.25,0.25]):
        random.shuffle(gender_proportion)       
        for index, gender in enumerate(gender_proportion):
            for i in range(int(user_amount*gender)):
                user = self.user_factory.factory_method(gender=UserFactory.GENDER[index],age_type=UserFactory.AGE_TYPE[i % 3])
                real_user = self.user_factory.add_to_database(user)
                if real_user:
                    self.users.add(user)


    def swipe(self) -> None:
        for user in self.users:
            suggestions = MatchingManager.get_suggestions({'id': user.user_id})
            user.suggestions = suggestions # pas necessaire ?
            for suggestion in suggestions:
                print(suggestion)
                json_suggestion = {'suggestion_id': suggestion['suggestion_id'], "choice": 'yes'}
                MatchingManager.update_suggestion(json_suggestion)


        # faire suggestions : [ personnes]
        # picky strategy or not
        # plugger fonc BE: premiers elements de la liste ( ) clustering 
        # desperate: all 
        

