from enum import Enum

class User:
    def __init__(self,first_name:str, last_name:str, dob:int, gender:str, email:str,
                 preferences:dict,interests:dict, bio: str, photo_key: str, password:str = 'password123') -> None: # set[str]
        self.first_name = first_name
        self.last_name = last_name
        self.dob = dob
        self.gender = gender
        self.email = email
        self.preferences = preferences
        self.interests = interests
        self.bio = bio
        self.photo_key = photo_key
        self.password = password


    
    @property
    def first_name(self) -> str:
        return self.__first_name
    
    @first_name.setter
    def first_name(self, first_name:str) -> None:
        self.__first_name = first_name

    @property
    def last_name(self) -> str:
        return self.__last_name
    
    @last_name.setter
    def last_name(self, last_name:str) -> None:
        self.last_name = last_name
    
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
    def email(self) -> str:
        return self.__email
    
    @email.setter
    def email(self, email:str) -> None:
        self.__email = email
        
    
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
        
    @property
    def photo_key(self) -> str:
        return self.__photo_key
    
    @photo_key.setter
    def photo_key(self, photo_key:str) -> None:
        self.__photo_key = photo_key
    
    @property
    def password(self) -> str:
        return self.__password
    
    @password.setter
    def password(self, password:str) -> None:
        self.__password = password