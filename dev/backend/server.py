
from flask import Flask, jsonify, request, make_response, send_file
from flask_cors import CORS
from file_tree import create_file_tree
from Managers.chatroom_socket_manager import ChatroomSocketManager
from Managers.chatroom_manager import ChatroomManager
# create_file_tree()
import json_tests

# pour websocket
from flask_socketio import SocketIO

from DAOs.matching_dao import MatchingDAO

from Managers.account_manager import AccountManager
from Managers.matching_manager import MatchingManager

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}},
            methods=["GET", "POST", "OPTIONS"],
            allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Access-Control-Allow-Origin"])


socketio = SocketIO(app, cors_allowed_origins="*")


chatroomManager = ChatroomManager() # need to be an object because contains a discharged list
websocketManager = ChatroomSocketManager(socketio,chatroomManager)

@app.route('/test', methods=['GET'])
def test_connection():
    return jsonify(message="Hello React this is Flask")

# -------- ACCOUNTS ------------


@app.route('/create-account', methods=['POST'])
def create_account() -> bool:
    response = AccountManager.create_account(request.json)
    return jsonify(True) if response else jsonify(False)


@app.route('/login', methods=['POST'])
def login() -> bool:
    response = AccountManager.login(request.json)
    # call middleware to generate token; send it to frontend
    # make sure database gets it !!!!
    return jsonify(response)

@app.route('/get-profile', methods=['POST'])
def get_profile() -> bool:
    # if authentication_middleware.check_session_validity():
    #     return account_manager.get_profile()
    response = AccountManager.get_profile(request.json)
    print('get profile: ', response)
    return jsonify(response) if response else jsonify(False)

# ---- PAS UTLISÉ ENCORE!!

@app.route('/modify-profile', methods=['POST'])
def modify_profile() -> bool:
    response = AccountManager.modify_profile(request.json)
    return jsonify(True) if response else jsonify(False)



@app.route('/delete-account', methods=['POST'])
def settings() -> bool:
    print(request.json)
    response = AccountManager.delete_account(request.json)
    # call middleware to generate token; send i to frontend
    # make sure database gets it !!!!
    return jsonify(response)


# -------- PHOTOS ------------

@app.route('/get-photo', methods=['POST'])
def get_photo() -> bool:
    # if authentication_middleware.check_session_validity():
    #     return account_manager.get_profile()
    print("frontend sent this:", request.json)
    photo, mimetype = AccountManager.get_photo(request.json[0])
    print(photo, mimetype)
    return send_file(photo, mimetype=mimetype, as_attachment=False) if not isinstance(photo, bool) else jsonify(False)

@app.route('/upload-photo', methods=['POST'])
def upload_photos() -> bool:
    print(request.files)
    files = request.files
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

# -------- CHATROOMS ------------

@app.route('/get-chatrooms', methods=['POST'])
def fetch_chatroom_list() -> list:  # send JSON jsonify ...
    response = chatroomManager.get_chatrooms(request.json)
    return jsonify(response)


@app.route('/get-messages', methods=['POST'])
def connect_chatroom() -> list:  # send JSON jsonify ...
    response = chatroomManager.get_chatroom_messages(request.json)
    print(response)
    return jsonify(response)


# -------- MATCHING ------------

@app.route('/suggestions', methods=['POST'])
def get_suggestions() -> list:
    response = MatchingManager.get_suggestions(request.json)
    print ('suggestions: ', response)
    if not response:
        MatchingManager.create_suggestions(request.json)
        response = MatchingManager.get_suggestions(request.json)
    return jsonify(response) if response else jsonify(False)

@app.route('/update-suggestion', methods=['POST'])
def update_suggestion() -> bool:
    response = MatchingManager.update_suggestion(request.json)
    return jsonify(response)

# undo():json - plus necessaire ? juste affiché dans le frontend?

if __name__ == '__main__':
    
    #print(MatchingManager.get_suggestions(1))
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
    #app.run(debug=True, host="0.0.0.0", port=5000)
    # key = 'pngtree-image-of-cute-radish-vector-or-color-illustration-png-image_2040180.jpg'
    # AccountManager.get_photo(key)
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
