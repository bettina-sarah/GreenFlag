from abc import ABC

class Observer(ABC):
    def __init__(self) -> None:
        pass

    def process(self) -> bool:
        pass

    # makes an object iterable?
    def __iter__(self):
        pass