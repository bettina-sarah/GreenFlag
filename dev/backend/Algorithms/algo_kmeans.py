'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : algo_kmeans.py
Created By  : Vincent Fournier
About       : Contient une implémentation du clustering K-Means utilisant scikit-learn,
              avec des méthodes pour entraîner l'algorithme, obtenir les centres de 
              clusters et les étiquettes, et prédire les appartenancesdes points.
====================================================================================
------------------------------------------------------------------------------------
'''

from sklearn.cluster._kmeans import KMeans as KMeansScikit
from Algorithms.algo_strategy import AlgoStrategy
import numpy as np

class KMeans(AlgoStrategy):
  def __init__(self, n_clusters: int):
    self.algo = KMeansScikit(n_clusters)

  def get_cluster_centers(self) -> np.ndarray:
    return self.algo.cluster_centers_
  
  def get_labels(self) -> np.ndarray:
    return self.algo.labels_

  def fit(self, np_array: np.ndarray):
    self.algo.fit(np_array)

  def predict(self, np_array: np.ndarray):
    return self.algo.predict(np_array)