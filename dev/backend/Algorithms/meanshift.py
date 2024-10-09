import numpy as np
class MeanShift:
    def __init__(self, bandwidth:int,max_iteration:int, tolerance:int):
        self.bandwidth = bandwidth
        self.max_iteration = max_iteration
        self.tolerance = tolerance

        #getters setters and private

    def fit(self, np_array:np.ndarray) -> None:
        origin = np_array
        x, y = origin.shape
        old = origin.copy()
        
        # while 
        
        new = np.zeros((x,y),dtype=np.float64)
        counter = 0
        
        for i in range(y):
            if (old[i,:] - old[:,:]) < self.bandwith:
                new[i,:] += old[i,:]
                counter += 1
            

    def predict(self, np_array:np.ndarray) -> None:
        pass
