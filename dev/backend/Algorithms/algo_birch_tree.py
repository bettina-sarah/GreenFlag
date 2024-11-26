from sklearn.cluster._birch import Birch as BirchScikit
from Algorithms.algo_strategy import AlgoStrategy
import numpy as np

class Birch(AlgoStrategy):
  def __init__(self, threshold:float=0.5):
    self.algo = BirchScikit(threshold=threshold)

  def get_labels(self)->np.ndarray:
    return self.algo.labels_
  
  def fit(self, np_array:np.ndarray)->None:
    self.algo.fit(np_array)
  
  def predict(self, np_array):
    return self.algo.predict(np_array)