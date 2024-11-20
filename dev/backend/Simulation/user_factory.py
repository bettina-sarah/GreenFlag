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

    def factory_method_young_men(self):
        
        '''
        SET & DICTIONNARY WAY
        '''
        # activity_set = set()
        # while len(activity_set) < 5:
        #     activity = random.randint(0,19)
        #     activity_set.add(ACTIVITY_TUPLE[activity])
        # new_dict = copy.deepcopy(ACTIVITY_DICT)
        # for activity in activity_set:
        #     new_dict[activity] = True

        '''
        NUMPY WAY
        '''
        activity_list = np.full(20,False,bool)
        activity_list[0:5] = True
        np.random.shuffle(activity_list)
        zipped = zip(ACTIVITY_TUPLE,activity_list)
        activity_dict = dict(zipped)
        

            
                
        user = User(self.__faker.name_male, self.__faker.date_of_birth(minimum_age=18,maximum_age=35),
                     gender='Male', preferences=[],interests=activity_dict)
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