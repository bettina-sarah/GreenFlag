from flask_socketio import SocketIO, emit, join_room
from Managers.chatroom_manager import ChatroomManager
import datetime

class ChatroomSocketManager:
    def __init__(self, socketio: SocketIO, chatroom_manager: ChatroomManager) -> None:
        self.socketio = socketio
        self.chatroom_manager = chatroom_manager
        self.current_room = None
        
        self.socketio.on_event('join_chatroom', self.handle_join_chatroom)
        self.socketio.on_event('message', self.handle_message)

    def handle_join_chatroom(self, room:dict[str]):
        room_name = room["chatroom_name"]
        join_room(room_name)
        self.current_room = room_name

    def handle_message(self, data:dict[str,int]):
        message = data['message']
        sender_id = data['sender_id']
        now = datetime.datetime.now()
        datetime_string = now.strftime('%Y-%m-%d %H:%M:%S')
        new_message = (
            self.current_room,
            sender_id,
            message,
            datetime_string
        )
        self.chatroom_manager.add_chatroom_message(new_message)
        self.socketio.emit('message', {'chatroom': self.current_room, 'sender_id':sender_id, 'message': message}, room=self.current_room, include_self=False)