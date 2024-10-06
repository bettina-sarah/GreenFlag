import numpy as np
from util_classes.strategy import Strategy
class AlgoStrategy(Strategy):
    def __init__(self, type:str) -> None:
        self.type = type
        pass
    
    def fit(self, np_array:np.ndarray):
        pass

    def predict(self, np_array:np.ndarray):
        pass