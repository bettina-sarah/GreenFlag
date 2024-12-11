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
                self.user_factory.add_to_database(user)
                self.users.add(user)

    def swipe(self) -> None:
        nbr_users = len(self.users)
        nbr_picky_users = int(nbr_users * 0.33)
        nbr_random_users = int(nbr_users * 0.33)
        nbr_desperate_users = nbr_users - nbr_picky_users - nbr_random_users
        
        strategy_nbr_users = [nbr_picky_users, nbr_random_users, nbr_desperate_users]


        for user in self.users:
            suggestions = MatchingManager.get_suggestions({'id': user.user_id})
            user.suggestions = suggestions # pas necessaire ?
            strategy_choice = random.randint(0,2)
            try:
                swiped_list = self.contexts[strategy_choice].perform_swipe(len(suggestions))
                strategy_nbr_users[strategy_choice] -= 1

                # decrease here isnt good.

                # manipulated list
                for index, suggestion in enumerate(suggestions):
                    print(suggestion)
                    json_suggestion = {'suggestion_id': suggestion['suggestion_id'], "choice": swiped_list[index]}
                    MatchingManager.update_suggestion(json_suggestion)

            except Exception as error:
                print(error)
                pass
        

