from abc import ABC

class Observer(ABC):
    def __init__(self) -> None:
        pass

    def process(self) -> bool:
        pass

    