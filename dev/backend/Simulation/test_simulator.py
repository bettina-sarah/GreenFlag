from Simulation.user_factory import UserFactory
import random

class TestSimulator:
    def __init__(self) -> None:
        self.users = set()
        self.user_factory = UserFactory("w")
    
    # get old users to put in set ? 

    def create_random_users(self, user_amount: int= 100, gender_proportion:list = [0.25,0.25,0.25,0.25]):
        random.shuffle(gender_proportion)       
        for index, gender in enumerate(gender_proportion):
            for i in range(int(user_amount*gender)):
                user = self.user_factory.factory_method(gender=UserFactory.GENDER[index],age_type=UserFactory.AGE_TYPE[i % 3])
                self.user_factory.add_to_database(user)
                self.users.add(user)


    def swipe(self) -> None:
        pass
        # loop set: 
#         @app.route('/suggestions', methods=['POST'])
# def get_suggestions() -> list:
#     response = MatchingManager.get_suggestions(request.json)
#     print ('suggestions: ', response)
#     # if not response:
#     #     MatchingManager.create_suggestions(request.json)
#     #     response = MatchingManager.get_suggestions(request.json)
#     return jsonify(response) if response else jsonify(False)

# @app.route('/update-suggestion', methods=['POST'])
# def update_suggestion() -> bool:
#     response = MatchingManager.update_suggestion(request.json)
#     return jsonify(response)

        # faire suggestions : [ personnes]
        # picky strategy or not
        # plugger fonc BE

