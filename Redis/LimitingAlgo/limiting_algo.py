from datetime import datetime, timedelta
import threading
from fastapi import HTTPException
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from Redis.Cache.cache import Cache


class RateLimiter:

    def __init__(self):
        self.interval = 86400 # 24 hours
        self.limit_per_interval = 3 # three requests per 24 hour interval
        self.lock = threading.Lock()
        self.cache = Cache()


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

    def allow_request(self, ip):
        with self.lock:
            current_time = datetime.now().timestamp()
            window_start = current_time - self.interval

            # Clean up old requests
            self.cache.clean_old_requests(ip, window_start)
            # Count current requests within the window
            request_count = self.cache.get_request_count(ip, window_start, current_time)
            
            if request_count >= self.limit_per_interval:
                raise RateLimitExceeded()
            
            # Log the current request
            self.cache.add_request(ip, current_time)
            return True
