from abc import ABC

class Strategy(ABC):
    def __init__(self, name) -> None:
        self.name = name

    def select(self) -> None:
        pass

