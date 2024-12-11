from Simulation.user_factory import UserFactory
from Simulation.swiping_strategy import SwipingContext, RandomStrategy, PickyStrategy, DesperateStrategy
from Managers.matching_manager import MatchingManager
from Simulation.user import User
from typing import Set
import random

class TestSimulator:
    def __init__(self) -> None:
        self.users : Set[User] = set()
        self.user_factory = UserFactory("w")
        self.suggestions= set()
        self.contexts = (SwipingContext(PickyStrategy()), SwipingContext(RandomStrategy()), SwipingContext(DesperateStrategy())) 
    
    # !!! get old users to put in set

    def create_random_users(self, user_amount: int= 100, gender_proportion:list = [0.25,0.25,0.25,0.25]):
        random.shuffle(gender_proportion)       
        for index, gender in enumerate(gender_proportion):
            for i in range(int(user_amount*gender)):
                user = self.user_factory.factory_method(gender=UserFactory.GENDER[index],age_type=UserFactory.AGE_TYPE[i % 3])
                real_user = self.user_factory.add_to_database(user)
                if real_user:
                    self.users.add(user)

    def swipe(self) -> None:
        
        random.shuffle(self.users)
        nbr_users = len(self.users)
        nbr_picky_users = int(nbr_users * 0.33)
        nbr_random_users = int(nbr_users * 0.33)
        nbr_desperate_users = nbr_users - nbr_picky_users - nbr_random_users
        
        strategy_nbr_users = [nbr_picky_users, nbr_random_users, nbr_desperate_users]
        strategy_list_for_users = [[0] * nbr_picky_users, [1] * nbr_random_users, [2] * nbr_desperate_users]


        for index_user, user in enumerate(self.users):
            suggestions = MatchingManager.get_suggestions({'id': user.user_id})
            user.suggestions = suggestions # pas necessaire ?
            strategy_choice = random.randint(0,2)
            try:
                swiped_list = self.contexts[strategy_list_for_users[index_user]].perform_swipe(len(suggestions))
                # manipulated list
                for index, suggestion in enumerate(suggestions):
                    print(suggestion)
                    json_suggestion = {'suggestion_id': suggestion['suggestion_id'], "choice": swiped_list[index]}
                    MatchingManager.update_suggestion(json_suggestion)

            except Exception as error:
                print(error)
                pass
        

