from enum import Enum

class User:
    def __init__(self,name:str, dob:int, gender:str, preferences:dict,interests:dict, bio: str) -> None: # set[str]
        self.name = name
        self.dob = dob
        self.gender = gender
        self.preferences = preferences
        self.interests = interests
        self.bio = bio


    
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
    def preferences(self) -> dict:
        return self.__preferences
    
    @preferences.setter
    def preferences(self, preferences:dict) -> None:
        self.__preferences = preferences
    
    @property
    def interests(self) -> dict:
        return self.__interests
    
    @interests.setter
    def interests(self, interests:dict) -> None:
        self.__interests = interests

    @property
    def bio(self) -> str:
        return self.__bio
    
    @bio.setter
    def bio(self, bio:str) -> None:
        self.__bio = bio
    