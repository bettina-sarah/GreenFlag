from enum import Enum

class User:
    def __init__(self,name:str, dob:int, gender:str, preferences:tuple,interests:set[str]) -> None:
        self.name = name
        self.dob = dob
        self.gender = gender
        self.preferences = preferences
        self.interests = interests


    
    @property
    def name(self) -> str:
        return self.__name
    
    @name.setter
    def name(self, name:str) -> None:
        self.__name = name
    
    @property
    def dob(self) -> int:
        return self.__dob
    
    @dob.setter
    def dob(self, dob:int) -> None:
        self.__dob = dob
    
    @property
    def gender(self) -> str:
        return self.__gender
    
    @gender.setter
    def gender(self, gender:str) -> None:
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