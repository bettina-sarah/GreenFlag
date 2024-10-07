from abc import ABC
#import psycopg2

class DAO(ABC):
    def __init__(self) -> None:
        pass

    @staticmethod
    def create_connection(params: dict ) -> None:
        pass

    @staticmethod
    def get_connection() -> None:
        pass

    @staticmethod
    def store_request(request) -> None: 
        pass

    @staticmethod
    def send_requests(requests: list) -> None:
        pass


    # def __next__(self):
    #     pass

    # def __len__(self) -> int:
    #     pass

    # def __getitem__(self, item):
    #     pass

    # def __setitem__(self, key, value):
    #     pass

    # def __delitem__(self, key):
    #     pass

    # def __contains__(self, item):
    #     pass

    # def __call__(self, *args, **kwargs):
    #     pass
