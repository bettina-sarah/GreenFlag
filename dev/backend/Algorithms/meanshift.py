import numpy as np
# import sklearn.cluster._mean_shift as ms
from Algorithms.algo_strategy import AlgoStrategy
class MeanShift(AlgoStrategy):
    def __init__(self, bandwidth:int,max_iteration:int, tolerance:int):
        self.bandwidth = bandwidth
        self.max_iteration = max_iteration
        self.tolerance = tolerance
        self.clusters_centers = None
        self.labels = None
        #getters setters and private
        
    def get_cluster_centers(self)->np.ndarray:
        return self.cluster_centers
    
    def get_labels(self)->np.ndarray:
        return self.labels

    def fit(self, np_array:np.ndarray) -> None:
        origin = np_array
        number_of_rows, number_of_columns = origin.shape
        old = origin.copy()
        done_moving = np.zeros(number_of_rows,dtype=bool)
                
        for _ in range(self.max_iteration):
            new = np.zeros((number_of_rows,number_of_columns),dtype=np.float64)
            max_movement = 0
        
            for i in range(number_of_rows):
                # check if the point doesn't need to move anymore
                if done_moving[i]:
                    if np.all(new[i, :] == 0):
                        new[i, :] = old[i, :]
                    continue
                
                # point of interest
                P = old[i]
                
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
        
        print(clusters_centers)
        
        # clusters_centers = np.zeros((1, number_of_columns))
        # for center in np.unique(np.round(new, decimals=1), axis=0):
        #     if not np.equal(clusters_centers,center).all(axis=1).any():
        #         np.vstack((clusters_centers, center))
        #     else:
        #         # Check if this center is close to any existing ones
        #         if np.min(np.linalg.norm(np.array(clusters_centers) - center, axis=1)) > self.bandwidth:
        #             np.vstack((clusters_centers, center))
        
        #print(clusters_centers)
        
        
        labels = np.zeros(number_of_rows, np.int32)
        
        # for each point calculate the distance with the cluster centers
        # and assign the point to the closest cluster
        for i in range(number_of_rows):
            labels[i] = np.argmin(np.linalg.norm(clusters_centers - new[i,:], axis=1))
            
            
        self.clusters_centers = clusters_centers
        self.labels = labels
        
        return self.clusters_centers, self.labels

    # will need to be used on the subject to know his label
    # and then on all the data to get a list of all the other users with the same label
    # or we need to find a way to keep an array of the points(users) with the label they have
    def predict(self, point:np.ndarray) -> None:
        
        
        # find the closest cluster center
        if self.clusters_centers is not None and self.labels is not None:
            distances = np.linalg.norm(self.clusters_centers - point, axis=1)
            closest_cluster = np.argmin(distances)
        
        # return the label predicted
            return self.labels[closest_cluster]
        
        
if __name__ == "__main__":
    np.random.seed(17)
    data = np.random.rand(100, 2) * 20
    print(data)
    
    skms = ms.MeanShift(bandwidth=5, max_iter=10000)
    skms.fit(data)
    
    meanshift = MeanShift(bandwidth=3, max_iteration=100, tolerance=0.001)
    old, origin = meanshift.fit(data)
    
    point = np.array([3, 3])
    
    print(skms.labels_)
    print(skms.predict(point.reshape(1, -1)))
    
    
    print(meanshift.labels)
    print(meanshift.predict(point))
    
    import matplotlib.pyplot as plt

# # Plot the points and clusters
# plt.scatter(origin[:, 0], origin[:, 1], c=meanshift.labels)
# plt.scatter(meanshift.clusters_centers[:, 0], meanshift.clusters_centers[:, 1], color='red', marker='x')
# plt.show()
