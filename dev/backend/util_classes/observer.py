from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def __call__(self,list):
        pass