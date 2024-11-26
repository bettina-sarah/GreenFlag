from sklearn.cluster._kmeans import KMeans as KMeansScikit
from Algorithms.algo_strategy import AlgoStrategy
import numpy as np

class KMeans(AlgoStrategy):
  def __init__(self, n_clusters:int,max_iteration:int, tolerance:float):
    self.algo = KMeansScikit(n_clusters,max_iteration,tolerance)

  def get_labels(self)->np.ndarray:
    return self.algo.labels_

  def fit(self, np_array:np.ndarray):
    self.algo.fit(np_array)

  def predict(self, np_array):
    return self.algo.predict(np_array)