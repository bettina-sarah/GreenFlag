from Simulation.user_factory import UserFactory
from Managers.matching_manager import MatchingManager
from Simulation.user import User
# from typing import Set
import random

import logging
import coloredlogs

level_styles = {
    'debug': {'color': 'blue'},
    'info': {'color': 'green'},
    'warning': {'color': 'yellow'},
    'error': {'color': 'red'},
    'critical': {'color': 'magenta'}
}


coloredlogs.install(level='DEBUG', level_styles=level_styles)


class TestSimulator:
    def __init__(self) -> None:
        self.users : list[User] = []
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
                    self.users.append(user)
                    logging.debug(f"User {repr(user)} created locally")
                    

        # logging.info("This is an info message.")
        # logging.warning("This is a warning message.")
        # logging.error("This is an error message.")
        # logging.critical("This is a critical message.")


    def swipe(self) -> None:
        random.shuffle(self.users)
        nbr_users = len(self.users)
        nbr_picky_users = int(nbr_users * 0.33)
        nbr_random_users = int(nbr_users * 0.33)
        nbr_desperate_users = nbr_users - nbr_picky_users - nbr_random_users
        strategy_list_for_users = [0] * nbr_picky_users + [1] * nbr_random_users + [2] * nbr_desperate_users
        
        for index_user, user in enumerate(self.users):
            suggestions = MatchingManager.get_suggestions({'id': user.user_id})
            user.suggestions = suggestions # pas necessaire ?
            try:
                chosen_context_index = strategy_list_for_users[index_user]
                swiped_list = self.contexts[chosen_context_index].perform_swipe(len(suggestions))
                # manipulated list
                for index, suggestion in enumerate(suggestions):
                    logging.info(f"--- SUGGESTION: {suggestion['suggestion_id']}, user: {suggestion['user_infos']['profile_info']['basic_info']['first_name']}")
                    json_suggestion = {'suggestion_id': suggestion['suggestion_id'], "choice": swiped_list[index]}
                    MatchingManager.update_suggestion(json_suggestion)
            except Exception as error:
                logging.error(f'No suggestions available; error: {error}')
                pass

        

