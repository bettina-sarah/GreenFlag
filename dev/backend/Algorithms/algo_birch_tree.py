'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : algo_birch_tree.py
Created By  : Vincent Fournier
About       : Contient une implémentation de l'algorithme Birch basé sur scikit-learn,
              avec des méthodes pour l'entraînement, l'obtention des sous-centres de
              clusters et des étiquettes, ainsi que pour prédire les clusters des 
              points donnés.
====================================================================================
------------------------------------------------------------------------------------
'''

from sklearn.cluster._birch import Birch as BirchScikit
from Algorithms.algo_strategy import AlgoStrategy
import numpy as np

class Birch(AlgoStrategy):
  def __init__(self, threshold: float = 0.5):
    self.algo = BirchScikit(threshold=threshold)

  def get_cluster_centers(self) -> np.ndarray:
    return self.algo.subcluster_centers_

  def get_labels(self) -> np.ndarray:
    return self.algo.labels_
  
  def fit(self, np_array: np.ndarray) -> None:
    self.algo.fit(np_array)
  
  def predict(self, np_array) -> int:
    return self.algo.predict(np_array)