import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from Redis.LimitingAlgo.limiting_algo import FixedCounterWindow, SlidingWindow

class RateLimiter:

    @staticmethod
    def get_instance(algo:str = None):

        if algo == 'FixedCounterWindow':
            return FixedCounterWindow()
        
        else: return SlidingWindow()