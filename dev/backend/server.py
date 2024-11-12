# import os
# os.environ['GEVENT_SUPPORT'] = 'True'

# from gevent import monkey
# monkey.patch_all()

from flask import Flask, jsonify, request, make_response, send_file
from flask_cors import CORS
from flask_socketio import SocketIO
from Managers.chatroom_socket_manager import ChatroomSocketManager
from Managers.chatroom_manager import ChatroomManager
from Managers.account_manager import AccountManager
from Managers.matching_manager import MatchingManager

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}},
            methods=["GET", "POST", "OPTIONS"],
            allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Access-Control-Allow-Origin"])


socketio = SocketIO(app, cors_allowed_origins="*")  #,async_mode="gevent")


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
    return jsonify(response) if response else jsonify(False)

@app.route('/complete-profile', methods=['POST'])
def complete_profile() -> bool:
    response = AccountManager.complete_profile(request.json)
    # call middleware to generate token; send it to frontend
    # make sure database gets it !!!!
    return jsonify(response) if response else jsonify(False)

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
    print("id : " + request.form['id'])
    print("image : " , request.files['image'])
    id = request.form['id']
    files = request.files['image']
    response = AccountManager.modify_photos(id,files)
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

@app.route('/get-chatroom-subject', methods=['POST'])
def fetch_chatroom_subject() -> list:  # send JSON jsonify ...
    response = chatroomManager.get_chatroom_subject(request.json)
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

if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
    #app.run(debug=True, host="0.0.0.0", port=5000)