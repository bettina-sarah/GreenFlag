import numpy as np
class MeanShift:
    def __init__(self, bandwidth:int,max_iteration:int, tolerance:int):
        self.bandwidth = bandwidth
        self.max_iteration = max_iteration
        self.tolerance = tolerance
        #getters setters and private

    def fit(self, np_array:np.ndarray) -> None:
        origin = np_array
        number_of_rows, number_of_columns = origin.shape
        old = origin.copy()
        done_moving = np.zeros(number_of_rows,dtype=bool)
                
        for _ in range(self.max_iteration):
            new = np.zeros((x,y),dtype=np.float64)
            max_movement = 0
        
            for i in range(number_of_columns):
                # check if the point doesn't need to move anymore
                if done_moving[i]:
                    continue
                
                # point of interest
                P = old[i,:]
                
                # calculate norms (euclidian distances)
                distances = np.linalg.norm(old - P, axis=1)
                
                # first way
                # sum all points within the bandwidth
                # new[i,:] += old[distances <= self.bandwith]
                # find the number of points within the bandwidth
                # total = np.sum(distances <= self.bandwith)
                # divide the sum by the number of points to find the mean
                # new[i,:] /= total
                
                # second way
                # mask of points within the bandwidth
                within_bandwidth = distances <= self.bandwith
                # only poits within the bandwidth
                points_within = old[within_bandwidth]
                # find the mean of these points to get the new center
                new[i,:] = np.mean(points_within, axis=0)
                
                # find the distance of movement
                movement = np.linalg.norm(new[i,:] - P)
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
        unique_points = np.unique(np.round(new, decimals=3),axis=0)
        clusters = np.zeros(number_of_rows)
        
        # for each point calculate the distance with the cluster centers
        # and assign the point to the closest cluster
        for i in range(number_of_rows):
            clusters[i] = np.argmin(np.linalg.norm(unique_points - new[i,:], axis=1))
            
        clusters_centers = unique_points
        labels = clusters
        
        return clusters_centers, labels

    def predict(self, np_array:np.ndarray) -> None:
        pass
