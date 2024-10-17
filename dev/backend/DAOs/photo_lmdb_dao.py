#Lightning Memory-Mapped Database: key value
import lmdb
from typing import List

# pillow necessary for image processing
from PIL import Image
import io

class PhotoDAO:
    def __init__(self) -> None:
        self.env = lmdb.open('my_lmdb_database', map_size=100 * 1024 * 1024)  # 100 MB au debut

    def add_photos(self, photos:List[str]) -> list | bool:
        keys = []
        try:
            with self.env.begin(write=True) as txn: 
                for photo in photos:
                    key = photo.filename.encode('utf-8')
                    
                    img_byte_arr = io.BytesIO()
                    image = Image.open(photo)
                    image.save(img_byte_arr, format=image.format)
                    img_bytes = img_byte_arr.getvalue()
                    txn.put(key, img_bytes)
                    keys.append(key)
                self.env.close()
                return keys
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