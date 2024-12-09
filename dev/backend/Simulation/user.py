from enum import Enum

class User:
    def __init__(self,first_name:str, last_name:str, dob:int, gender:str, height:int, email:str, religion:str, want_kids:bool,
                 city:str,latitude: float, longitude: float, preferences:dict,interests:dict, bio: str, photo_key: str, password:str = 'password123') -> None:
        self.first_name = first_name
        self.last_name = last_name
        self.dob = dob
        self.gender = gender
        self.height = height
        self.email = email
        self.religion = religion
        self.preferences = preferences
        self.want_kids = want_kids
        self.city = city
        self.latitude = latitude
        self.longitude = longitude
        self.interests = interests
        self.bio = bio
        self.photo_key = photo_key
        self.password = password
        self.__user_id : int
        
        



    
    
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
        self.__last_name = last_name
    
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
    def height(self) -> int:
        return self.__height
    
    @height.setter
    def height(self, value:int) -> None:
        self.__height = value

    @property
    def email(self) -> str:
        return self.__email
    
    @email.setter
    def email(self, email:str) -> None:
        self.__email = email
    
    @property
    def religion(self) -> str:
        return self.__religion
    
    @religion.setter
    def religion(self,value) -> None:
        self.__religion = value
        
    @property
    def want_kids(self) -> bool:
        return self.__wants_kids
    
    @want_kids.setter
    def want_kids(self,value) -> None:
        self.__wants_kids = value
    
    @property
    def city(self) -> str:
        return self.__city
    
    @city.setter
    def city(self,value) -> None:
        self.__city = value
        
    @property
    def latitude(self) -> str:
        return self.__latitude
    
    @latitude.setter
    def latitude(self,value) -> None:
        self.__latitude = value

    @property
    def longitude(self) -> str:
        return self.__longitude
    
    @longitude.setter
    def longitude(self,value) -> None:
        self.__longitude = value
    
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
    def photo_key(self) -> list[str]:
        return self.__photo_key
    
    @photo_key.setter
    def photo_key(self, photo_key:list[str]) -> None:
        self.__photo_key = photo_key
    
    @property
    def password(self) -> str:
        return self.__password
    
    @password.setter
    def password(self, password:str) -> None:
        self.__password = password
    
    @property
    def user_id(self) -> int:
        return self.__user_id  
    
    @user_id.setter
    def user_id(self, id: int) -> None:
        self.__user_id = id
    
    
    @property
    def basic_account_info(self) -> dict:
        return {'firstname': self.first_name,
                'lastname': self.last_name,
                'email': self.email,
                'password': self.password}
    
    @property
    def info(self) -> dict:
        info = self.preferences
        info['gender'] = self.gender
        info['height'] = self.height
        info['want_kids'] = self.want_kids
        info['religion'] = self.religion
        info['city'] = self.city
        info['bio'] = self.bio
        info['date_of_birth'] = self.dob
        return info