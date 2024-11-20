from __future__ import annotations
from user import User
from abc import ABC, abstractmethod
from faker import Faker
# import random
# import copy
import numpy as np


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
        
        preferences = {'min_age': '29', 'max_age': '60',
                       'relationship_type': 'shortterm',
                       'preferred_genders': ['Female']}
        return preferences

    def factory_method_young_men(self):
        
        {'id': '1', 'info': {'gender': 'Male', 'height': '185', 'religion': 'Jewish', 'want_kids': True, 
                             'city': 'Montreal', 'bio': 'dfavsdf', 'min_age': '29', 'max_age': '60', 
                             'relationship_type': 'shortterm', 'date_of_birth': '2005-02-01T05:00:00.000Z', 
                             'preferred_genders': ['Female']}}    
        # & activties

        activity_dict = self.generate_activities()
        preferences_dict = self.generate_preferences()
    
        user = User(self.__faker.name_male, self.__faker.date_of_birth(minimum_age=18,maximum_age=35),
                     gender='Male', preferences=preferences_dict,interests=activity_dict)
        # self.__faker.name_nonbinary
        # self.__faker.name_male
        # make women, non binary, males that have preferences also: 
        
    # old men, young old women, young old nb
    
    
    
    
    def create_user(self, id:int, dob:int, gender:User.Gender, preferences:tuple,interests:tuple) -> User:
        # return User(id, dob, gender, preferences,interests)
        pass

if __name__ == "__main__":
    user_factory = UserFactory("men")
    user_factory.factory_method_young_men()