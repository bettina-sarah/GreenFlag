from __future__ import annotations
from Simulation.user import User
from abc import ABC, abstractmethod
from faker import Faker
import random
import numpy as np
from DAOs.photo_lmdb_dao import PhotoDAO
from Managers.account_manager import AccountManager
from typing import List


ACTIVITY_TUPLE = ("hiking",
"yoga",
"photography",
"cooking",
"traveling",
"reading",
"videogaming",
"biking",
"running",
"watchingmovies",
"workingout",
"dancing",
"playinginstrument",
"attendingconcerts",
"painting",
"volunteering",
"playingsports",
"crafting",
"petlover",
"learningnewlanguage"
)

RELATIONSHIP_TYPE = ("fun", "shortterm", "longterm")

GENDER = ("Male", "Female", "Non-Binary")

# ACTIVITY_DICT = {activity: False for activity in ACTIVITY_TUPLE}



class Factory(ABC):
    def __init__(self) -> None:
        pass
    
    # @abstractmethod
    # def factory_method_men(self):
    #     pass

    @abstractmethod
    def factory_method_young_men(self):
        pass

    
    
    # @abstractmethod
    # def factory_method_women(self):
    #     pass
    
    # @abstractmethod
    # def factory_method_nonbinary(self):
    #     pass

class UserFactory(Factory):
    def __init__(self, name) -> None:
        self.__faker = Faker()
        self.__name = name
    
    def generate_activities(self):
        '''SET & DICTIONNARY WAY'''
        # activity_set = set()
        # while len(activity_set) < 5:
        #     activity = random.randint(0,19)
        #     activity_set.add(ACTIVITY_TUPLE[activity])
        # new_dict = copy.deepcopy(ACTIVITY_DICT)
        # for activity in activity_set:
        #     new_dict[activity] = True
        '''NUMPY WAY'''
        activity_list = np.full(20,False,bool)
        activity_list[0:5] = True
        np.random.shuffle(activity_list)
        zipped = zip(ACTIVITY_TUPLE,activity_list)
        activity_dict = dict(zipped)
        return activity_dict
        #return np.random.choice(ACTIVITY_TUPLE, 5, replace=False)
    
    def generate_preferences(self):
        min_age = random.randint(18,59)
        max_age = random.randint(min_age,60)

        rel_type = random.randint(0,2)

        relationship_type = RELATIONSHIP_TYPE[rel_type]

        gender = random.randint(0,2)
        preferred_gender = GENDER[gender]    
        
        preferences = {'min_age': str(min_age), 'max_age': str(max_age),
                       'relationship_type': relationship_type,
                       'preferred_genders': [preferred_gender]} # not good bc it only returnd one gender!
        return preferences

    def factory_method_young_men(self):
        
        # {'id': '1', 'info': {'gender': 'Male', 'height': '185', 'religion': 'Jewish', 'want_kids': True, 
        #                      'city': 'Montreal', 'bio': 'dfavsdf', 'min_age': '29', 'max_age': '60', 
        #                      'relationship_type': 'shortterm', 'date_of_birth': '2005-02-01T05:00:00.000Z', 
        #                      'preferred_genders': ['Female']}}    
        # & activties

        activity_dict = self.generate_activities()
        preferences_dict = self.generate_preferences()
    
        photoDAO = PhotoDAO()
        # password by default
        user = User(self.__faker.first_name_male(), self.__faker.last_name_male(), self.__faker.date_of_birth(minimum_age=18,maximum_age=35),
                     gender='Male', email=self.__faker.email(),preferences=preferences_dict,interests=activity_dict, bio = self.__faker.text(200), photo_key=photoDAO.add_photos())
        
        return user
        # self.__faker.name_nonbinary
        # self.__faker.name_male
        # make women, non binary, males that have preferences also: 
        
    # old men, young old women, young old nb

    def add_to_database(self, user_list: list[User]):
        for user in user_list:
            user_id = AccountManager.create_account(user.basic_account_info)
            # {'id': '1', 'hobbies': {'hiking': False, 'yoga': False, 'photography': False, 'cooking': False, 
            #                         'traveling': False, 'reading': False, 'videogaming': False, 'biking': False, 'running': False, 
            #                         'watchingmovies': False, 'workingout': False, 'dancing': False, 'playinginstrument': False, 'attendingconcerts': True, 
            #                         'painting': True, 'volunteering': True, 'playingsports': True, 'crafting': True, 'petlover': False, 'learningnewlanguage': False}}
            
            
            
            AccountManager.complete_profile({'id': user_id})
            
        
        
    

if __name__ == "__main__":
    user_factory = UserFactory("men")
    user = user_factory.factory_method_young_men()