from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/test',methods=['GET'])
def test_connection():
    return jsonify(message="Hello React this is Flask")

@app.route('/login', method=['POST'])
def login() -> bool:
    pass

@app.route('/create_account', method=['POST'])
def create_account() -> bool:
    pass

@app.route('/questionnaire', method=['POST'])
def questionnaire() -> bool:
    pass

@app.route('/chatrooms', method=['GET'])
def fetch_chatroom_list() -> list:  #send JSON jsonify ... 
    pass

@app.route('/chat', method=['GET'])
def connect_chatroom() -> list:  #send JSON jsonify ... 
    pass

@app.route('/modify_profile', method=['POST'])
def modify_profile()-> bool:
    pass

@app.route('/suggestions', methods=['POST', 'GET'])
def update_suggestion() -> bool:
    pass

@app.route('/suggestions', method=['POST'])
def get_suggestions() -> list:
    pass

# undo():json - plus necessaire ? juste affiché dans le frontend?

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)