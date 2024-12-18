'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : discharged_list.py
Created By  : Bettina-Sarah Janesch et Vincent Fournier
About       : Ce module définit une classe abstraite Strategy servant de base pour
              implémenter des stratégies spécifiques, ainsi qu'une classe Context 
              permettant de configurer et de gérer dynamiquement une stratégie via 
              un modèle de conception basé sur le "Strategy Pattern".
====================================================================================
------------------------------------------------------------------------------------
'''

from abc import ABC

class Strategy(ABC):
    def __init__(self, name) -> None:
        self.name = name

class Context():
    def __init__(self,strategy: Strategy):
        self.strategy = strategy
        
    @property
    def strategy(self)->Strategy:
        return self._strategy
    
    @strategy.setter
    def strategy(self, strategy: Strategy)->None:
        self._strategy = strategy