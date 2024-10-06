from user import User

class UserFactory:
    def __init__(self, name) -> None:
        self.name = name

    def create_user(self, id:int, dob:int, gender:User.Gender, preferences:tuple,interests:tuple) -> User:
        return User(id, dob, gender, preferences,interests)