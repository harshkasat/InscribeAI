from datetime import datetime, timedelta
import threading
from fastapi import HTTPException
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from Redis.Cache.cache import Cache


redis = Cache()

class RateLimiter:

    def __init__(self):
        self.interval = 86400
        self.limit_per_interval = 3
        self.lock = threading.Lock()
        self.redi_client = redis.redis_client()


class RateLimitExceeded(HTTPException):

    def __init__(self, detail='Rate Limit Exceeded'):
        super().__init__(status_code=429, detail=detail)


class FixedCounterWindow(RateLimiter):

    def __init__(self):
        super().__init__()
        self.counter = 0
        self.current_time = datetime.now().time().replace(second=0, microsecond=0)

    def allow_request(self):

        with self.lock:
            curr = datetime.now().time().replace(second=0,microsecond=0)
            if curr!=self.current_time:
                self.current_time = curr
                self.counter = 0
            
            if self.counter>=self.limit_per_interval:
                raise RateLimitExceeded()
            self.counter+=1
            return True



class SlidingWindow(RateLimiter):
    def __init__(self):
        super().__init__()
        self.logs = []

    
    def allow_request(self):
        while self.lock:
            curr = datetime.now()
            while len(self.logs)>0 and (curr-self.logs[0]).total_seconds()>self.interval:
                self.logs.pop(0)

            if len(self.logs)>=self.limit_per_interval:
                raise RateLimitExceeded()
            
            self.logs.append(curr)
            return True