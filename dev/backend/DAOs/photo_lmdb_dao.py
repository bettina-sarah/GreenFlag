#Lightning Memory-Mapped Database: key value
import lmdb
from typing import List
from faker import Faker

# pillow necessary for image processing
from PIL import Image
import io

class PhotoDAO:
    def __init__(self) -> None:
        self.env = lmdb.open('my_lmdb_database', map_size=48 * 1024 * 1024)
        self.faker = Faker()

    def add_photos(self, photos:List[str]= None) -> list | bool:
        keys = []
        try:
            with self.env.begin(write=True) as txn:
                if isinstance(photos, list): 
                    for photo in photos:
                        key = self.encode_image(txn, photo)
                        keys.append(key)
                    self.env.close()
                    return keys
                elif photos is None:
                    key = self.encode_image(txn)
                    keys.append(key)
                    return keys
                else:
                    key = self.encode_image(txn, photos)
                    keys.append(key)
                    return keys
        except Exception as e:
            print("PHOTO DAO add phptp not working: ", e)
            return []
    


    def encode_image(self,txn,photo=None) -> str:
        # encodage pour lm db seulement !
        if photo:
            key = photo.filename.encode('utf-8')        
            image = Image.open(photo)
        else:
            avatar_bytes = self.faker.image((200,200)) # bytearray
            key = self.faker.text(max_nb_chars=16)
            key = key.encode('utf-8')        
            # image = Image.open(avatar)
            txn.put(key, avatar_bytes)
            return key.decode('utf-8')
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format=image.format)
        img_bytes = img_byte_arr.getvalue()
        txn.put(key, img_bytes)
        return key.decode('utf-8')


    def delete_photo(self, user_id:str, photo_id:str) -> bool:
        try:
            with self.env.begin(write=True) as txn:
                txn.delete(user_id + photo_id) #key
                self.env.close()
                return True
        except Exception as e:
            print(e)
            return False
    
    def get_photo(self, key) -> str | bool:
        try:
            with self.env.begin() as txn:
                # key is a single tuple here with a string inside !!!
                photo_data = txn.get(key.encode('utf-8'))
                image = self.decode_image(photo_data)
                # self.env.close()
            return image
        except Exception as e:
            print(e)
            return False
    

    def decode_image(self, byte_array):
        img_byte_arr = io.BytesIO(byte_array)
        image = Image.open(img_byte_arr)


        output_stream = io.BytesIO()
        image.save(output_stream, format=image.format)  # Use the image format from the decoded image
        output_stream.seek(0)  # Reset the stream position
        return output_stream