'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : sim_main.py
Created By  : Bettina-Sarah Janesch
About       : Contient les strategies de swiper (difficile, aléatoire, et desesperé)
              et le contexte qui va avec le patron de conception Strategy.
====================================================================================
------------------------------------------------------------------------------------
'''

from util_classes.strategy import Strategy, Context
import random

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
        amount_of_yes = int(nbr_suggestions* 0.1)
        amount_of_no = nbr_suggestions - amount_of_yes
        suggestions = [self._choices[0]] * amount_of_no + [self._choices[1]] * amount_of_yes
        return suggestions


class RandomStrategy(SwipingStrategy):
    def __init__(self) -> None:
        super().__init__('random')
    
    def swipe(self, nbr_suggestions) -> None:
        return [random.choice(self._choices) for _ in range(nbr_suggestions)]



class DesperateStrategy(SwipingStrategy):
    def __init__(self) -> None:
        super().__init__('desperate')
    
    def swipe(self, nbr_suggestions) -> list:
        return [self._choices[1]] * nbr_suggestions

class SwipingContext(Context):
    def __init__(self, strategy: SwipingStrategy):
        self.strategy = strategy

    def set_strategy(self, strategy: SwipingStrategy):
        self.strategy = strategy

    def perform_swipe(self, suggestions):
        return self.strategy.swipe(suggestions)
    

    