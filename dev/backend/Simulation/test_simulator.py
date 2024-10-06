from user_factory import UserFactory

class TestSimulator:
    def __init__(self) -> None:
        self.users = []

    def create_users(self, users_blueprint:list) -> bool:
        #comprehension
        self.users = [UserFactory.create_user(id, dob, gender, preferences,interests)
                  for id, dob, gender, preferences,interests in users_blueprint]
        if self.users:
            return True
        return False


    
    def swipe(self) -> None:
        pass