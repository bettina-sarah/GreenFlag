'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : algo_meanshift.py
Created By  : Vincent Fournier
About       : Contient une implémentation personnalisée de l'algorithme Mean Shift 
              pour le clustering, incluant les méthodes d'entraînement (fit) et de 
              prédiction (predict), avec une gestion manuelle des déplacements des 
              points et des centres de clusters.
====================================================================================
------------------------------------------------------------------------------------
'''

import numpy as np
from Algorithms.algo_strategy import AlgoStrategy

class MeanShift(AlgoStrategy):
    def __init__(self, bandwidth: int, max_iteration: int, tolerance: float):
        self.bandwidth = bandwidth
        self.max_iteration = max_iteration
        self.tolerance = tolerance
        self.clusters_centers = None
        self.labels = None

    def get_cluster_centers(self) -> np.ndarray:
        return self.clusters_centers

    def get_labels(self) -> np.ndarray:
        return self.labels

    def fit(self, np_array: np.ndarray) -> None:
        origin = np_array
        number_of_rows, number_of_columns = origin.shape
        old = origin.copy()
        done_moving = np.zeros(number_of_rows, dtype=bool)
                
        for _ in range(self.max_iteration):
            new = np.zeros((number_of_rows, number_of_columns), dtype=np.float64)
            max_movement = 0
        
            for i in range(number_of_rows):
                # check if the point doesn't need to move anymore
                if done_moving[i]:
                    if np.all(new[i,:] == 0):
                        new[i,:] = old[i,:]
                    continue
                
                # point of interest
                P = old[i]
                
                # calculate norms (euclidian distances)
                distances = np.linalg.norm(old - P, axis=1)
            
                # mask of points within the bandwidth
                within_bandwidth = distances <= self.bandwidth
                # only poits within the bandwidth
                points_within = old[within_bandwidth]
                
                if points_within.size > 0:
                    # find the mean of these points to get the new center
                    new[i] = np.mean(points_within, axis=0)
                else:
                    new[i] = old[i]
                
                # find the distance of movement
                movement = np.linalg.norm(new[i] - P)
                max_movement = max(max_movement, movement)
                
                # keep log of points that doesn't need to move anymore
                if movement <= self.tolerance:
                    done_moving[i] = True
                
            # check if there's no more movement
            if max_movement < self.tolerance:
                break
            
            # change the old points for the new points
            old = new.copy()
        
        # get the clusters center points
        clusters_centers = np.unique(np.round(new, decimals=3),axis=0)

        labels = np.zeros(number_of_rows, np.int32)
        
        # for each point calculate the distance with the cluster centers
        # and assign the point to the closest cluster
        for i in range(number_of_rows):
            labels[i] = np.argmin(np.linalg.norm(clusters_centers - new[i,:], axis=1))
            
            
        self.clusters_centers = clusters_centers
        self.labels = labels
        
        return self.clusters_centers, self.labels

    def predict(self, point: np.ndarray) -> int:
        # find the closest cluster center
        if self.clusters_centers is not None and self.labels is not None:
            distances = np.linalg.norm(self.clusters_centers - point, axis=1)
            closest_cluster = np.argmin(distances)
        
            # return the label predicted
            return self.labels[closest_cluster]