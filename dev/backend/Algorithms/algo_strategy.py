import numpy as np
from abc import abstractmethod
from util_classes.strategy import Strategy, Context
class AlgoStrategy(Strategy):
    def __init__(self, type:str) -> None:
        self.type = type
    
    @abstractmethod
    def get_cluster_centers(self)->np.ndarray:
        pass
    
    @abstractmethod
    def get_labels(self)->np.ndarray:
        pass
    
    @abstractmethod
    def fit(self, np_array:np.ndarray):
        pass
        
    @abstractmethod
    def predict(self, np_array:np.ndarray):
        pass
    
class AlgoContext(Context):
    
    def get_cluster_centers(self)->np.ndarray:
        return self._strategy.get_cluster_centers()
    
    def get_labels(self)->np.ndarray:
        return self._strategy.get_labels()
    
    def fit(self, np_array:np.ndarray)->tuple:
        return self._strategy.fit(np_array)

    def predict(self, np_array:np.ndarray)->list:
        return self._strategy.predict(np_array)