from abc import ABC, abstractmethod
from typing import List, Callable
from time import perf_counter
import threading

class DischargedList(ABC):
  def __init__(self,limit: int, max_time: float):
    self._observers: List[Callable[[], None]] = []
    self._items: List = []
    self._limit = limit
    self._max_time = max_time
    self._start_time = None
    
  def __getitem__(self,index):
    return self._items[index]
    
  def add_item(self, item):
    if not self._items:
      self._start_time = perf_counter()
      self._items.append(item)
    else:
      now = perf_counter()
      if (self._start_time - now) >= self._max_time:
        self._notify_observers()
        self.clear_list()

      self._start_time = perf_counter()
      self._items.append(item)
    
  
  def add_observer(self, observer:Callable[[],None]):
    self._observers.append(observer)
    
  def _notify_observers(self):
    for observer in self._observers:
      observer()
    
  def get_items(self):
    return self._items
  
  def clear_list(self):
    self._items = []
    
class Observer(ABC):
    @abstractmethod
    def __call__(self):
      pass