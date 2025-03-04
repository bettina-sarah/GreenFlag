'''
------------------------------------------------------------------------------------
====================================================================================
Filename    : discharged_list.py
Created By  : Vincent Fournier
About       : Ce module implémente une classe DischargedList qui gère une liste avec
              des mécanismes de suivi automatique. Lorsqu'un certain nombre d'éléments
              (limit) est atteint ou qu'un temps maximum (max_time) s'écoule, la liste
              se vide en notifiant les observateurs attachés.
====================================================================================
------------------------------------------------------------------------------------
'''

from abc import ABC, abstractmethod
from typing import List, Callable, Any
from time import perf_counter, sleep
import threading

class DischargedList:
    
    class Observer(ABC):
        @abstractmethod
        def __call__(self,list):
            pass
    
    def __init__(self,limit: int, max_time: float):
        self._observers: List[Callable[[], None]] = []
        self._items: list[tuple[Any,...]] = []
        self._limit = limit
        self._max_time = max_time
        self._start_time = None
        self._tracking = False
        self._lock = threading.Lock()
        
    def __getitem__(self,index):
        return self._items[index]
    
    def add_item(self,item):
        if not self._items:
            self._start_time = perf_counter()
            self._start_tracking()
        
        self._items.append(item)
        
        if len(self._items) >= self._limit:
            self.discharge()
            self._tracking = False
            
    def _start_tracking(self):
        if not self._tracking:
            self._tracking = True
            tracking_thread = threading.Thread(target=self._track_time)
            tracking_thread.start()
    
    def _track_time(self):
        while self._tracking:
            sleep(1)
            now = perf_counter()
            with self._lock:
                if self._items and (now - self._start_time) >= self._max_time:
                    self.discharge()
                    self._tracking = False
    
    def add_observer(self, observer:Callable):
        self._observers.append(observer)
        
    def _notify_observers(self):
        for observer in self._observers:
            observer(self._items)
            
    def get_items(self):
        return self._items
    
    def clear_items(self):
        self._items = []
        
    def discharge(self):
        self._notify_observers()
        self.clear_items()