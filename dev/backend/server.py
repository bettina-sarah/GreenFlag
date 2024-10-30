
from flask import Flask, jsonify, request, make_response, send_file
from flask_cors import CORS
from file_tree import create_file_tree
import json_tests

# create_file_tree()

from DAOs.matching_dao import MatchingDAO

from Managers.account_manager import AccountManager
from Managers.matching_manager import MatchingManager

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


@app.route('/get-profile', methods=['POST'])
def get_profile() -> bool:
    # if authentication_middleware.check_session_validity():
    #     return account_manager.get_profile()
    response = AccountManager.get_profile(request.json)
    return jsonify(response) if response else jsonify(False)

# -------- PHOTOS ------------

@app.route('/get-photo', methods=['POST'])
def get_photo() -> bool:
    # if authentication_middleware.check_session_validity():
    #     return account_manager.get_profile()
    print("frontend sent this:", request.json)
    response, photos = AccountManager.get_profile(request.json)

    print(photos, photos[0])
    # return jsonify(response) if response else jsonify(False)
    return send_file(photos[0], mimetype='image/png', as_attachment=False)

@app.route('/upload-photo', methods=['POST'])
def upload_photos() -> bool:
    print(request.files)
    files = request.files
    # #info = request.json
    # #response = AccountManager.modify_photos(info, files)
    response = AccountManager.modify_photos(files)
    return jsonify(True) if response else jsonify(False)


# ------ QUESTIONNAIRE -------
# ATTENTION WE SHOULD KNOW IF NEW USER OR NOT. DIFFERENCE BETWEEN INSERT & UPDATE REQUEST
@app.route('/questionnaire', methods=['POST'])
def questionnaire() -> bool:
    print(request.json)
    response = AccountManager.update_preferences(request.json)
    #response = AccountManager.modify_profile(request.json)
    return jsonify(response)


@app.route('/hobbies', methods=['POST'])
def update_hobbies() -> bool:
    print(request.json)
    response = AccountManager.update_hobbies(request.json)
    return jsonify(response)


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





# @app.route('/photo', methods=['GET'])
# def get_photos() -> list:
#     # i need user_id here!
#     response = AccountManager.get_photos(request.json)
#     return response


@app.route('/suggestions', methods=['GET'])
def get_suggestions() -> list:
    response = MatchingManager.get_suggestions()
    return jsonify(True) if response else jsonify(False)

@app.route('/update-suggestion', methods=['POST'])
def update_suggestion() -> bool:
    pass

# undo():json - plus necessaire ? juste affiché dans le frontend?

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
    # json = {'id': '11'}
    # AccountManager.get_profile(json)

    # MatchingDAO.get_suggestions('1')

    #print(MatchingDAO.update_suggestion(5,1,'yes'))
    #print(MatchingDAO.get_matches(1))
    #print(MatchingDAO.get_user_infos(1))
    #MatchingDAO.create_suggestions(4,[1]) # suppose to and does throw an error because primary key already exists
    #MatchingDAO.create_suggestions(1,[5])
    #MatchingDAO.flag_user(1,2,'Harassment or bullying')
    # AccountManager.get_profile(json)
    # AccountManager.delete_account(json_delete)

    # AccountManager.modify_profile(json_tests.json_modify)
