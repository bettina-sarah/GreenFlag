from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from file_tree import create_file_tree
import json_tests

#create_file_tree()

from Managers.account_manager import AccountManager

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}}, 
            methods=["GET", "POST", "OPTIONS"],
            allow_headers=["Content-Type", "Authorization", "X-Requested-With"])

@app.route('/test',methods=['GET'])
def test_connection():
    return jsonify(message="Hello React this is Flask")

@app.route('/login', methods=['POST'])
def login() -> bool:
    response = AccountManager.login(request.json)
    # call middleware to generate token; send it to frontend
    # make sure database gets it !!!!
    return jsonify(response)
    #return jsonify(True)

@app.route('/settings', methods=['POST'])
def settings() -> bool:
    print(request.json)
    response = AccountManager.delete_account(request.json)
    # call middleware to generate token; send it to frontend
    # make sure database gets it !!!!
    return jsonify(response)
    #return jsonify(True)


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

@app.route('/questionnaire', methods=['POST'])
def questionnaire() -> bool:
    response = AccountManager.modify_profile(request.json)
    return jsonify(response)



@app.route('/chatrooms', methods=['GET'])
def fetch_chatroom_list() -> list:  #send JSON jsonify ... 
    pass

@app.route('/chat', methods=['GET'])
def connect_chatroom() -> list:  #send JSON jsonify ... 
    pass

@app.route('/modify_profile', methods=['POST'])
def modify_profile()-> bool:
    response = AccountManager.modify_profile(request.json)
    return jsonify(True) if response else jsonify(False)

@app.route('/modify_photos', methods=['POST'])
def modify_photos()->bool:
    files = request.files
    info = request.json
    response = AccountManager.modify_photos(info, files)
    return jsonify(True) if response else jsonify(False)


@app.route('/suggestions', methods=['POST', 'GET'])
def update_suggestion() -> bool:
    pass

@app.route('/suggestions', methods=['POST'])
def get_suggestions() -> list:
    pass

# undo():json - plus necessaire ? juste affiché dans le frontend?

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
    
    # AccountManager.get_profile(json)
    # AccountManager.delete_account(json_delete)

    # AccountManager.modify_profile(json_tests.json_modify)
    
