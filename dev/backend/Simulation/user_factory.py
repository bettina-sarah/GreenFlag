from __future__ import annotations
from Simulation.user import User
from abc import ABC, abstractmethod
from faker import Faker
import random
import numpy as np
from DAOs.photo_lmdb_dao import PhotoDAO
from Managers.account_manager import AccountManager
from datetime import datetime, timezone
import logging
import coloredlogs

# Set up custom colors
level_styles = {
    'debug': {'color': 'blue'},
    'info': {'color': 'green'},
    'warning': {'color': 'yellow'},
    'error': {'color': 'red'},
    'critical': {'color': 'magenta'}
}

# Install coloredlogs with custom styles
coloredlogs.install(level='DEBUG', level_styles=level_styles)

class Factory(ABC):    
    def __init__(self) -> None:
        pass
    
    # @abstractmethod
    # def factory_method_men(self):
    #     pass

    @abstractmethod
    def factory_method(self):
        pass

    
    
    # @abstractmethod
    # def factory_method_women(self):
    #     pass
    
    # @abstractmethod
    # def factory_method_nonbinary(self):
    #     pass

class UserFactory(Factory):
    
    
    ACTIVITY_TUPLE = (
    "hiking",
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

    GENDER = ("Male", "Female", "Non-Binary", "Other")
    
    AGE_TYPE = ("young","middle", "old" )
    
    RELIGION = (
    "Atheist",
    "Spiritual",
    "Christian",
    "Muslim",
    "Jewish",
    "Hindu",
    "Buddhist",
    "Sikh",
    "Taoist",
    "Shinto",
    "Confucian",
    "Bahai",
    "Pagan",
    "Agnostic",
    "Other",
    )
    
    CITY_LIST = [
    ['Ahuntsic-Cartierville', (45.5599, -73.6984)],
    ['Côte-des-Neiges', (45.4695, -73.6263)],
    ['Lachine', (45.4217, -73.6336)],
    ['LaSalle', (45.4058, -73.6335)],
    ['Le Plateau-Mont-Royal', (45.5230, -73.5956)],
    ['Mercier-Hochelaga-Maisonneuve', (45.5564, -73.5358)],
    ['Outremont', (45.5145, -73.6111)],
    ['Rosemont–La Petite-Patrie', (45.5289, -73.6012)],
    ['Saint-Laurent', (45.4654, -73.6883)],
    ['Saint-Léonard', (45.5582, -73.6053)],
    ['Verdun', (45.4488, -73.5815)],
    ['Ville-Marie', (45.5017, -73.5673)],
    ['Villeray–Saint-Michel–Parc-Extension', (45.5510, -73.6110)],

    ['Chomedey', (45.5745, -73.7516)],
    ['Duvernay', (45.7394, -73.5524)],
    ['Fabreville', (45.5989, -73.7975)],
    ['Laval-des-Rapides', (45.5552, -73.6953)],
    ['Laval-Ouest', (45.4877, -73.8561)],
    ['Sainte-Dorothée', (45.5851, -73.7965)],
    ['Vimont', (45.7549, -73.6524)],

    ['Brossard', (45.4523, -73.5020)],
    ['Candiac', (45.3894, -73.4493)],
    ['Châteauguay', (45.4004, -73.7497)],
    ['Greenfield Park', (45.4725, -73.4935)],
    ['LeMoyne', (45.4678, -73.5121)],
    ['Saint-Bruno-de-Montarville', (45.5327, -73.4034)],
    ['Saint-Lambert', (45.5014, -73.5049)],
    ['Longueuil', (45.5239, -73.5238)],

    ['Terrebonne', (45.7084, -73.7492)],
    ['Rosemère', (45.6492, -73.7944)],
    ['Blainville', (45.6544, -73.8739)],
    ['Mirabel', (45.6819, -74.0782)],
    ['Boisbriand', (45.6173, -73.8507)],
]
    
    
    def __init__(self, name) -> None:
        self.__faker = Faker()
        self.__name = name
    
    def generate_activities(self):
        activity_list = np.full(20,False,bool)
        activity_list[0:5] = True
        np.random.shuffle(activity_list)
        zipped = zip(UserFactory.ACTIVITY_TUPLE,activity_list)
        activity_dict = dict(zipped)
        return activity_dict
    
    def generate_preferences(self):
        min_age = random.randint(18,59)
        max_age = random.randint(min_age,60)

        rel_type = random.randint(0,2)
        relationship_type = UserFactory.RELATIONSHIP_TYPE[rel_type]
        
        nbr_pref_gender = random.randint(1,4)
        preferred_gender = set(random.sample(list(UserFactory.GENDER), nbr_pref_gender))   # Select a random subset of genders
        
        preferences = {'min_age': str(min_age), 'max_age': str(max_age),
                       'relationship_type': relationship_type,
                       'preferred_genders': preferred_gender}
        return preferences

    def factory_method(self, gender: str, age_type: str):
        if gender == "Male":
            first_name = self.__faker.first_name_male()
            last_name = self.__faker.last_name_male()
        elif gender == "Female":
            first_name = self.__faker.first_name_female()
            last_name = self.__faker.last_name_female()
        else:
            first_name = self.__faker.first_name_nonbinary()
            last_name = self.__faker.last_name_nonbinary()
        
        if age_type == "young":
            dob = self.__faker.date_of_birth(minimum_age=18,maximum_age=39) 
        elif age_type == "middle":
            dob = self.__faker.date_of_birth(minimum_age=40,maximum_age=59)
        elif age_type == "old":
            dob = self.__faker.date_of_birth(minimum_age=60,maximum_age=100)
            
        dob_with_time = datetime.combine(dob, datetime.min.time(), tzinfo=timezone.utc)
        dob_with_ms = dob_with_time.isoformat(timespec='milliseconds')
        if dob_with_time.tzinfo == timezone.utc:
            dob_with_ms = dob_with_ms.replace("+00:00", "Z")

        activity_dict = self.generate_activities()
        preferences_dict = self.generate_preferences()
    
        random_city = random.choice(UserFactory.CITY_LIST)
        photoDAO = PhotoDAO()
        user = User(first_name, last_name, dob_with_ms, 
                    gender = gender,
                    preferences=preferences_dict, 
                    interests=activity_dict, 
                    height = random.randint(150,250), 
                    email=self.__faker.email(), 
                    religion = random.choice(UserFactory.RELIGION),
                    want_kids=self.__faker.boolean(), 
                    city=random_city[0],
                    latitude=random_city[1][0],
                    longitude=random_city[1][1],
                    bio = self.__faker.text(200), 
                    photo_key=photoDAO.add_photos())
        return user

    def add_to_database(self, user: User):
        user_id = AccountManager.create_account(user.basic_account_info)
        logging.critical(f"User {user_id} created in database.")
        if user_id:
            user_id = user_id[0]
            user.user_id = user_id
            AccountManager.update_hobbies({'id': user_id, 'hobbies': user.interests})
            AccountManager.update_preferences({'id':user_id, 'info': user.info})
            AccountManager.modify_photos(user_id=user_id,keys=user.photo_key)
            AccountManager.complete_profile({'id': user_id})
            AccountManager.confirm_email({'id': user_id})
            AccountManager.confirm_fake({'id': user_id})
            AccountManager.update_localisation({'id': user_id, 'lat': user.latitude, 'long': user.longitude})
            return True
        return False