from abc import ABC


class Strategy(ABC):
    def __init__(self, name) -> None:
        self.name = name


class Context():
    def __init__(self,strategy:Strategy):
        self._strategy = strategy
        
    @property
    def strategy(self)->Strategy:
        return self._strategy
    
    @strategy.setter
    def strategy(self, strategy:Strategy)->None:
        self._strategy = strategy