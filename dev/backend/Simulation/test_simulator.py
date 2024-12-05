from Simulation.user_factory import UserFactory
import random

class TestSimulator:
    def __init__(self) -> None:
        self.users = set()
        self.user_factory = UserFactory("w")

    def create_random_users(self, user_amount: int= 100, gender_proportion:list = [0.25,0.25,0.25,0.25]):
        random.shuffle(gender_proportion)       
        for index, gender in enumerate(gender_proportion):
            for i in range(int(user_amount*gender)):
                user = self.user_factory.factory_method(gender=UserFactory.GENDER[index],age_type=UserFactory.AGE_TYPE[i % 3])
                self.user_factory.add_to_database(user)
                self.users.add(user)


    def swipe(self) -> None:
        pass

