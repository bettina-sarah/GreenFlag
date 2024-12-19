'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : server.py
Created By  : Bettina-Sarah Janesch et Vincent Fournier
About       : Contient une application Flask avec des routes pour gérer les comptes
              utilisateurs, les photos, les chatrooms, les suggestions de 
              correspondance, et les notifications, utilisant le socket.io pour les 
              communications en temps réel.
====================================================================================
------------------------------------------------------------------------------------
'''

import os
os.environ['GEVENT_SUPPORT'] = 'True'

from gevent import monkey
monkey.patch_all()

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_socketio import SocketIO
from Managers.chatroom_socket_manager import ChatroomSocketManager
from Managers.chatroom_manager import ChatroomManager
from Managers.account_manager import AccountManager
from Managers.matching_manager import MatchingManager
from Managers.notification_manager import NotificationManager
from authentication.authentication_middleware import AuthenticationMiddleware

import logging
import coloredlogs

level_styles = {
    'debug': {'color': 'blue'},
    'info': {'color': 'green'},
    'warning': {'color': 'yellow'},
    'error': {'color': 'red'},
    'critical': {'color': 'magenta'}
}


coloredlogs.install(level='DEBUG', level_styles=level_styles)
logger = logging.getLogger(__name__)

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}},
            methods=["GET", "POST", "OPTIONS"],
            allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Access-Control-Allow-Origin"])


socketio = SocketIO(app, cors_allowed_origins="*",async_mode="gevent")

chatroomManager = ChatroomManager()
websocketManager = ChatroomSocketManager(socketio,chatroomManager)

# -------- ACCOUNTS ------------

@app.route('/create-account', methods=['POST'])
def create_account() -> bool:
    response = AccountManager.create_account(request.json)
    return jsonify(response)

@app.route('/login', methods=['POST'])
def login() -> bool:
    response = AccountManager.login(request.json)
    if response:
        response['token'] = AuthenticationMiddleware().generate_token(response['id'])
        logger.warning(f'LOGGED IN! new token generated: {response['token']}')
        token_saved = AccountManager.save_token(response['id'], response['token'])
        return jsonify(response)
    return jsonify(False)

@app.route('/complete-profile', methods=['POST'])
def complete_profile() -> bool:
    response = AccountManager.complete_profile(request.json)
    return jsonify(response) if response else jsonify(False)

@app.route('/confirm-email', methods=['POST'])
def confirm_email() -> bool:
    response = AccountManager.confirm_email(request.json)
    return jsonify(response) if response else jsonify(False)

@app.route('/get-profile', methods=['POST'])
def get_profile() -> bool:
    response = AccountManager.get_profile(request.json)
    print('get profile: ', response)
    return jsonify(response) if response else jsonify(False)

# --- TOKEN ROUTES ------

@app.route('/verify-token', methods=['POST'])
def verify_token() -> bool:
    token = request.json
    token_is_valid, user_id = AuthenticationMiddleware().check_session_validity(token)
    if isinstance(token_is_valid, bool):
        if token_is_valid:
            does_token_exist = AccountManager.does_token_exist(user_id, token)
            response = does_token_exist[0][0]
            return jsonify(response)
        return jsonify(False)
    else: # is_valid a string: new token
        new_token = token_is_valid
        AccountManager.save_token(user_id, new_token)
        return jsonify({'token': new_token})

@app.route('/modify-password', methods=['POST'])
def modify_password() -> bool:
    response = AccountManager.modify_password(request.json)
    return jsonify(response)

@app.route('/modify-profile', methods=['POST'])
def modify_profile() -> bool:
    response = AccountManager.modify_profile(request.json)
    return jsonify(response)

@app.route('/delete-account', methods=['POST'])
def settings() -> bool:
    print(request.json)
    response = AccountManager.delete_account(request.json)
    return jsonify(response)

# -------- LOCALISATION ---------

@app.route('/localisation', methods=['POST'])
def update_localisation() -> bool:
    response = AccountManager.update_localisation(request.json)
    return jsonify(response)

@app.route('/get-location', methods=['POST'])
def get_location() -> bool:
    
    response = AccountManager.get_location(request.json)
    return jsonify(response)

# -------- PHOTOS ------------

@app.route('/get-photo', methods=['POST'])
def get_photo() -> bool:
    logger.warning(f"FRONTEND demande une photo avec: {request.json}")
    photo, mimetype = AccountManager.get_photo(request.json[0])
    logger.critical(f'Photo de type {mimetype} envoyé au FRONTEND')
    return send_file(photo, mimetype=mimetype, as_attachment=False) if not isinstance(photo, bool) else jsonify(False)

@app.route('/upload-photo', methods=['POST'])
def upload_photos() -> bool:
    id = request.form['id']
    files = request.files['image']
    response = AccountManager.modify_photos(id, files)
    return jsonify(response)

# ------ QUESTIONNAIRE -------


@app.route('/questionnaire', methods=['POST'])
def questionnaire() -> bool:
    print(request.json)
    response = AccountManager.update_preferences(request.json)
    return jsonify(response)

@app.route('/hobbies', methods=['POST'])
def update_hobbies() -> bool:
    print(request.json)
    response = AccountManager.update_hobbies(request.json)
    return jsonify(response)

# -------- CHATROOMS ------------

@app.route('/get-chatrooms', methods=['POST'])
def fetch_chatroom_list() -> list:
    response = chatroomManager.get_chatrooms(request.json)
    return jsonify(response)

@app.route('/get-messages', methods=['POST'])
def connect_chatroom() -> list:
    response = chatroomManager.get_chatroom_messages(request.json)
    print(response)
    return jsonify(response)

@app.route('/get-chatroom-subject', methods=['POST'])
def fetch_chatroom_subject() -> list:
    response = chatroomManager.get_chatroom_subject(request.json)
    print(response)
    return jsonify(response)

@app.route('/flag',methods=['POST'])
def flag_user() -> bool:
    response = chatroomManager.flag_user(request.json)
    print("response from flag backend:",response)
    return jsonify(response)

# -------- MATCHING ------------

@app.route('/suggestions', methods=['POST'])
def get_suggestions() -> list:
    response = MatchingManager.get_suggestions(request.json)
    print ('suggestions: ', response)
    return jsonify(response) if response else jsonify(False)

@app.route('/update-suggestion', methods=['POST'])
def update_suggestion() -> bool:
    response = MatchingManager.update_suggestion(request.json)
    return jsonify(response)

# -------- NOTIFICATIONS ------------

@app.route('/notifications', methods=['POST'])
def notifications() -> bool:
    response = NotificationManager.get_notifications(request.json)
    logger.warning(f'notifications:{response}'if response else 'no notifications available')
    return jsonify(response)
#---- ATTENTION JSONIFY TRUE FALSE GOOD OR BAD , CHECK RESPONSE TYPE AND REFACTOR !!!

@app.route('/update-notification', methods=['POST'])
def update_notification() -> bool:
    print('update_notification JSON: ', request.json)
    response = NotificationManager.update_notification(request.json)
    print(f'response db is: ', response)
    return jsonify(response)


if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)

