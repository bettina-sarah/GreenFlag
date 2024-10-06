from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

from Managers.account_manager import AccountManager
from backend.authentication.authentification_middleware import AuthenticationMiddleware

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

authentication_middleware = AuthenticationMiddleware() 
account_manager = AccountManager() # bad ? should be a singleton? not global?
# SHOULD THESE be abstract ???? 

@app.route('/test',methods=['GET'])
def test_connection():
    return jsonify(message="Hello React this is Flask")

@app.route('/login', methods=['POST'])
def login() -> bool:
    # call middleware to generate token; send it to frontend
    # make sure database gets it !!!!
    return jsonify(True)


@app.route('/create_account', methods=['POST'])
def create_account() -> bool:
    return jsonify(True)

@app.route('/questionnaire', methods=['POST'])
def questionnaire() -> bool:
    pass

@app.route('/chatrooms', methods=['GET'])
def fetch_chatroom_list() -> list:  #send JSON jsonify ... 
    pass

@app.route('/chat', methods=['GET'])
def connect_chatroom() -> list:  #send JSON jsonify ... 
    pass

@app.route('/profile', method=['GET'])
def get_profile() -> bool:
    if authentication_middleware.check_session_validity():
        return account_manager.get_profile()

@app.route('/modify_profile', methods=['POST'])
def modify_profile()-> bool:
    pass

@app.route('/suggestions', methods=['POST', 'GET'])
def update_suggestion() -> bool:
    pass

@app.route('/suggestions', methods=['POST'])
def get_suggestions() -> list:
    pass

# undo():json - plus necessaire ? juste affiché dans le frontend?

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)