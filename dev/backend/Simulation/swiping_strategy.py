from util_classes.strategy import Strategy, Context


# fichier fait par: Bettina-Sarah Janesch
'''
Contient les strategies de swiper (difficile, aléatoire, et desesperé) et le contexte qui
va avec le patron de conception Strategy.
'''

class SwipingStrategy(Strategy):

    def __init__(self, name) -> None:
        super().__init__(name)  
        self._choices = ('no', 'yes')

    def swipe(self, nbr_suggestions) -> None:
        pass

class PickyStrategy(SwipingStrategy):
    def __init__(self) -> None:
        super().__init__('picky')
    
    def swipe(self, nbr_suggestions) -> None:
        pass


class RandomStrategy(SwipingStrategy):
    def __init__(self) -> None:
        super().__init__('random')
    
    def swipe(self, nbr_suggestions) -> None:
        pass


class DesperateStrategy(SwipingStrategy):
    def __init__(self) -> None:
        super().__init__('desperate')
    
    def swipe(self, nbr_suggestions) -> list:
        return self._choices[1] * nbr_suggestions

class SwipingContext(Context):
    def __init__(self, strategy: SwipingStrategy):
        self.strategy = strategy

    def set_strategy(self, strategy: SwipingStrategy):
        self.strategy = strategy

    def perform_swipe(self, suggestions):
        return self.strategy.swipe(suggestions)
    

    