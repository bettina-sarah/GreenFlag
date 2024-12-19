'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : test_simulator.py
Created By  : Bettina-Sarah Janesch et Vincent Fournier
About       : Contient le simulateur principal de notre application avec la fabrique
              d'usagers et faire des suggestions (encore en attente) et des swipes.
====================================================================================
------------------------------------------------------------------------------------
'''

from Simulation.user_factory import UserFactory
from Simulation.swiping_strategy import SwipingContext, RandomStrategy, PickyStrategy, DesperateStrategy
from Managers.matching_manager import MatchingManager
from DAOs.chat_dao import ChatDAO
from DAOs.account_dao import AccountDAO
from Simulation.user import User
import random
from datetime import datetime, timedelta
from faker import Faker

import logging

class TestSimulator:
    def __init__(self) -> None:
        self.users : list[User] = []
        self.user_factory = UserFactory("w")
        self.suggestions= set()
        self.contexts = (SwipingContext(PickyStrategy()), SwipingContext(RandomStrategy()), SwipingContext(DesperateStrategy())) 
        self.faker = Faker()
    
    def create_random_users(self, user_amount: int = 100, gender_proportion: list = [0.25,0.25,0.25,0.25]):
        random.shuffle(gender_proportion)       
        for index, gender in enumerate(gender_proportion):
            for i in range(int(user_amount * gender)):
                user = self.user_factory.factory_method(gender=UserFactory.GENDER[index], age_type=UserFactory.AGE_TYPE[i % 3])
                real_user = self.user_factory.add_to_database(user)
                if real_user:
                    self.users.append(user)
                    logging.debug(f"User {repr(user)} created locally")

    def _create_pending_suggestions(self) -> None:
        for user in self.users:
            try:
                suggestions = MatchingManager.get_suggestions({'id': user.user_id, 'algo': 'Meanshift'})
                logging.critical(f'Suggestions for User {user.user_id} created.')
                user.suggestions = suggestions
            except Exception as error:
                logging.error(f'No suggestions available; error: {error}')
                pass

    def get_fake_users(self):
        fake_users = AccountDAO.get_fake_users((True,))
        for user in fake_users:
            old_user = User()
            old_user.user_id = user[0]
            self.users.append(old_user)

    def swipe(self) -> None:
        self.get_fake_users() 
        
        random.shuffle(self.users)
        nbr_users = len(self.users)
        nbr_picky_users = int(nbr_users * 0.165)
        nbr_random_users = int(nbr_users * 0.165)
        nbr_desperate_users = nbr_users - nbr_picky_users - nbr_random_users
    
        strategy_list_for_users = [0] * nbr_picky_users + [1] * nbr_random_users + [2] * nbr_desperate_users


        for index_user, user in enumerate(self.users):
            suggestions = MatchingManager.get_suggestions({'id': user.user_id, 'algo':'Meanshift'})
            user.suggestions = suggestions
            try:
                chosen_context_index = strategy_list_for_users[index_user]
                swiped_list = self.contexts[chosen_context_index].perform_swipe(len(suggestions))
                for index, suggestion in enumerate(suggestions):
                    logging.info(f"--- SUGGESTION: {suggestion['suggestion_id']}, user: {suggestion['user_infos']['profile_info']['basic_info']['first_name']}")
                    json_suggestion = {'suggestion_id': suggestion['suggestion_id'], "choice": swiped_list[index]}
                    MatchingManager.update_suggestion(json_suggestion)

            except Exception as error:
                logging.error(f'No suggestions available; error: {error}')
                pass
        
    def fill_conversations(self) -> None:
        logging.info("filling empty convos with msgs")
        empty_matches = ChatDAO.get_matches_without_msg()
        msgs = []
        if not empty_matches:
            logging.info("No empty match found")
            return True
        
        for match in empty_matches:
            match_id, member_id_1, member_id_2 = match
            nb_msgs = random.randint(1, 5)
            
            for _ in range(nb_msgs):
                now = datetime.now() + timedelta(minutes=random.randint(1, 5))
                datetime_string = now.strftime('%Y-%m-%d %H:%M:%S')
                sender = random.choice([member_id_1,member_id_2])
                
                msg = (match_id, sender, self.faker.sentence(nb_words=random.randint(3, 12)), datetime_string)
                msgs.append(msg)
        
        try:
            ChatDAO.add_fake_msgs(msgs)
            logging.info('Success! convos filled')
        except Exception as error:
            logging.error(f'An error occured when adding the messages   error: {error}')