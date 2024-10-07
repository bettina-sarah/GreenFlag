from DAOs.stats_dao import StatsDAO

class Statistics:
    def __init__(self, data) -> None:
        self.__mean = 0
        self.__median = 0
        self.__variance = 0
        self.data = data

    def calculate_statistics(self):
        pass

    def get_mean(self):
        return self.__mean

    def get_median(self):
        return self.__median

    def get_variance(self):
        return self.__variance

    # calculation done in BD OR NO?

    def calculate_mean(self, data):
        pass