from enum import Enum

class Gender(Enum): # pas sure de ca 
    MALE = 1
    FEMALE = 2
    NONBINARY = 3

class User:
    def __init__(self, id:int, dob:int, gender:Gender, preferences:tuple,interests:tuple) -> None:
        self.id = id
        self.dob = dob
        self.gender = gender
        self.preferences = preferences
        self.interests = interests

    @property
    def id(self) -> int:
        return self.__id
    
    @id.setter
    def id(self, id:int) -> None:
        self.__id = id

    @property
    def dob(self) -> int:
        return self.__dob
    
    @dob.setter
    def dob(self, dob:int) -> None:
        self.__dob = dob
    
    @property
    def gender(self) -> Gender:
        return self.__gender
    
    @gender.setter
    def gender(self, gender:Gender) -> None:
        self.__gender = gender
        
    
    @property
    def preferences(self) -> tuple:
        return self.__preferences
    
    @preferences.setter
    def preferences(self, preferences:tuple) -> None:
        self.__preferences = preferences
    
    @property
    def interests(self) -> tuple:
        return self.__interests
    
    @interests.setter
    def interests(self, interests:tuple) -> None:
        self.__interests = interests