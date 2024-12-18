'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : algo_affinity_propagation.py
Created By  : Vincent Fournier
About       : Contient une implémentation de l'algorithme Affinity Propagation basé 
              sur scikit-learn, avec des méthodes pour l'entraînement, l'obtention 
              des centres de clusters et des étiquettes, ainsi que pour prédire les 
              clusters des points donnés.
====================================================================================
------------------------------------------------------------------------------------
'''

from sklearn.cluster._affinity_propagation import AffinityPropagation as AffinityPropagationSciKit
from Algorithms.algo_strategy import AlgoStrategy
import numpy as np

class AffinityPropagation(AlgoStrategy):
  def __init__(self):
    self.algo = AffinityPropagationSciKit()
  
  def get_cluster_centers(self) -> np.ndarray:
      return self.algo.cluster_centers_    
    
  def get_labels(self) -> np.ndarray:
    return self.algo.labels_  
    
  def fit(self, np_array: np.ndarray) -> None:
    self.algo.fit(np_array)
    
  def predict(self, np_array: np.ndarray) -> int:
    return self.algo.predict(np_array)