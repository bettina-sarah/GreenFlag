#Lightning Memory-Mapped Database: key value
import lmdb

class PhotoDAO:
    def __init__(self) -> None:
        self.env = lmdb.open('my_lmdb_database', map_size=10 * 1024 * 1024)  # 10 MB au debut

    def add_photo(self, user_id:str, photo_id:str,photo_data:str) -> str:
        try:
            with self.env.begin(write=True) as txn:
                txn.put(user_id + photo_id, photo_data) # key & value
                self.env.close()
                return True
        except Exception as e:
            print(e)
            return False


    def delete_photo(self, user_id:str, photo_id:str) -> bool:
        try:
            with self.env.begin(write=True) as txn:
                txn.delete(user_id + photo_id) #key
                self.env.close()
                return True
        except Exception as e:
            print(e)
            return False
    
    def get_photo(self, user_id:str, photo_id:str) -> str | bool:
        try:
            with self.env.begin() as txn:
                photo_data = txn.get(user_id + photo_id)
                self.env.close()
                return photo_data
        except Exception as e:
            print(e)
            return False
        
        
    # def update_photo(self):
    #     pass