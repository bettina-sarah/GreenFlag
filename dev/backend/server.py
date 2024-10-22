
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from file_tree import create_file_tree
import json_tests

# create_file_tree()

from Managers.account_manager import AccountManager

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}},
            methods=["GET", "POST", "OPTIONS"],
            allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Access-Control-Allow-Origin"])


@app.route('/test', methods=['GET'])
def test_connection():
    return jsonify(message="Hello React this is Flask")


@app.route('/login', methods=['POST'])
def login() -> bool:
    response = AccountManager.login(request.json)
    # call middleware to generate token; send it to frontend
    # make sure database gets it !!!!
    return jsonify(response)
    # return jsonify(True)


@app.route('/settings', methods=['POST'])
def settings() -> bool:
    print(request.json)
    response = AccountManager.delete_account(request.json)
    # call middleware to generate token; send it to frontend
    # make sure database gets it !!!!
    return jsonify(response)
    # return jsonify(True)


@app.route('/create-account', methods=['POST'])
def create_account() -> bool:
    response = AccountManager.create_account(request.json)
    return jsonify(True) if response else jsonify(False)


@app.route('/profile', methods=['POST'])
def get_profile() -> bool:
    # if authentication_middleware.check_session_validity():
    #     return account_manager.get_profile()
    response = AccountManager.get_profile(request.json)
    return jsonify(True) if response else jsonify(False)


# ------ QUESTIONNAIRE -------

@app.route('/questionnaire', methods=['POST'])
def questionnaire() -> bool:
    print(request.json)
    response = AccountManager.modify_profile(request.json)
    return jsonify(response)


@app.route('/hobbies', methods=['POST'])
def update_hobbies() -> bool:
    print(request.json)
    response = AccountManager.update_hobbies(request.json)
    return jsonify(response)


''' MEMBER TABLE:
{'gender': 'm', 'height': '84', 'religion': 'Atheist', 'want_kids': True, 'city': 'Montreal', 'min_age': '46', 
'max_age': '60', 'relationship_type': 'shortterm', 'DateOfBirth': '2024-10-22T03:37:43.894Z', 'prefered_genders': ['Female']}
--- ACTIVITIES TABLES:
{'hiking': False, 'yoga': False, 'photography': False, 'cooking': False, 'traveling': False,
 'reading': False, 'videogaming': True, 'biking': True, 'running': True, 'watchingmovies': True, 'workingout': True,
   'dancing': False, 'playinginstrument': False, 'attendingconcerts': False, 'painting': False, 'volunteering': False, 
   'playingsports': False, 'crafting': False, 'petlover': False, 'learningnewlanguage': False}
'''


@app.route('/chatrooms', methods=['GET'])
def fetch_chatroom_list() -> list:  # send JSON jsonify ...
    pass


@app.route('/chat', methods=['GET'])
def connect_chatroom() -> list:  # send JSON jsonify ...
    pass


@app.route('/modify_profile', methods=['POST'])
def modify_profile() -> bool:
    response = AccountManager.modify_profile(request.json)
    return jsonify(True) if response else jsonify(False)


@app.route('/photo', methods=['POST'])
def modify_photos() -> bool:
    print(request.files)
    files = request.files
    # #info = request.json
    # #response = AccountManager.modify_photos(info, files)
    response = AccountManager.modify_photos(files)
    return jsonify(True) if response else jsonify(False)


@app.route('/photo', methods=['GET'])
def get_photos() -> list:
    # i need user_id here!
    response = AccountManager.get_photos(request.json)
    return response


@app.route('/suggestions', methods=['POST', 'GET'])
def update_suggestion() -> bool:
    pass


# undo():json - plus necessaire ? juste affiché dans le frontend?

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)

    # AccountManager.get_profile(json)
    # AccountManager.delete_account(json_delete)

    # AccountManager.modify_profile(json_tests.json_modify)
