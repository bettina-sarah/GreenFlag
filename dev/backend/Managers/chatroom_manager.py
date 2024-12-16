from DAOs.chat_dao import ChatDAO
from DAOs.account_dao import AccountDAO
from util_classes.discharged_list import DischargedList
# another class that manages the websocket chatroom? 
class ChatroomManager(DischargedList.Observer):
    def __init__(self) -> None:
        self.requests = DischargedList(5,5)
        self.requests.add_observer(self)
    
    def __call__(self, list:list[tuple[str,int]]):
        response = ChatDAO.send_messages(list)
        if response:
            return response
        return False
    
    def get_chatrooms(self, data) -> list:
        id = data.get("id")
        params = (id,)
        response = ChatDAO.get_chatroom_names(params)
        if response:
            return response
        return []

    def get_chatroom_messages(self, data) -> list:
        chatroom_name = data.get("chatroom_name")
        params = (chatroom_name,)
        response = ChatDAO.get_messages(params)
        if response:
            return response
        return []

    def get_chatroom_subject(self,data) -> dict[str]:
        chatroom_name = data.get('chatroom_name')
        user_id = data.get('id')
        params = (chatroom_name,)
        response = ChatDAO.get_chatroom_subject(params)
        if response:
            print("chatroom_subject", response)
            if response[0][0] == int(user_id):
                subject_id = response[0][1]
            else:
                subject_id = response[0][0]
                
            first_name = ChatDAO.get_subject_firstname(subject_id)
            
            params = (subject_id,)
            profile_photo = AccountDAO.get_photos(params, extraquery=' ORDER BY position LIMIT 1;')
            
            return {
                "subject_id": subject_id,
                "subject_firstname": first_name,
                "subject_avatar": profile_photo,
            }
            
        return {}
    
    def flag_user(self,data) -> bool:
        reporter_id = int(data.get('id'))
        subject_id = data.get('subject_id')
        reason = data.get('reason')
        params = (subject_id, reporter_id, reason)
        response = ChatDAO.flag_user(params)
        if response:
            return True
        
        return False
    
    

    def add_chatroom_message(self,data) -> None:
        self.requests.add_item(data)