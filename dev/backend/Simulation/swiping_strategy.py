from util_classes.strategy import Strategy, Context

class SwipingStrategy(Strategy):

    def __init__(self, name) -> None:
        super().__init__(name)  
        self.choices = ('no', 'yes')

    def picky(self) -> None:
        pass
    def random(self) -> None:
        pass
    def desperate(self) -> None:
        pass
    

# class AlgoStrategy(Strategy):
#     def __init__(self, type:str) -> None:
#         self.type = type
    
#     def fit(self, np_array:np.ndarray):
#         pass
        

#     def predict(self, np_array:np.ndarray):
#         pass
    
class SwipingContext(Context):
    
    # appelle strategy picky, random, desperate ... 
    def get_cluster_centers(self)->np.ndarray:
        return self._strategy.get_cluster_centers()
    
    def get_labels(self)->np.ndarray:
        return self._strategy.get_labels()
    
    def fit(self, np_array:np.ndarray)->tuple:
        return self._strategy.fit(np_array)

    def predict(self, np_array:np.ndarray)->list:
        return self._strategy.predict(np_array)