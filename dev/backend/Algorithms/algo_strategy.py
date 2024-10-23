import numpy as np
from util_classes.strategy import Strategy, Context
class AlgoStrategy(Strategy):
    def __init__(self, type:str) -> None:
        self.type = type
    
    def fit(self, np_array:np.ndarray):
        pass
        

    def predict(self, np_array:np.ndarray):
        pass
    
class AlgoContext(Context):
    
    def fit(self, np_array:np.ndarray)->tuple:
        return self._strategy.fit(np_array)

    def predict(self, np_array:np.ndarray)->list:
        return self._strategy.predict(np_array)