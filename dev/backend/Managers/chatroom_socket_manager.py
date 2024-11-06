from flask_socketio import SocketIO, emit, join_room
from Managers.chatroom_manager import ChatroomManager

class ChatroomSocketManager:
    def __init__(self, socketio: SocketIO, chatroom_manager: ChatroomManager) -> None:
        self.socketio = socketio
        self.chatroom_manager = chatroom_manager
        self.current_room = None

    def handle_join_chatroom(self, room):
        join_room(room)
        self.current_room = room

    def handle_message(self, data):
        message = data['message']
        self.chatroom_manager.add_chatroom_message(self.current_room, message)
        self.socketio.emit('message', {'chatroom': self.current_room, 'message': message}, room=self.current_room)