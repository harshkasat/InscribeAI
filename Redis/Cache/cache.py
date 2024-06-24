import redis
from datetime import datetime
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

class Cache:
    def __init__(self):
        # self.redis_client = redis.StrictRedis(host='172.17.0.2', port=6379, db=0)
        self.redis_client = redis.StrictRedis(host='inscribe-redis.5glsob.ng.0001.apse2.cache.amazonaws.com', port=6379, db=0)
        self.expiration_time_seconds = 86400 # 24 hours
    
    def add_request(self, ip, timestamp):
        key = f"request_log:{ip}"
        self.redis_client.zadd(key, {timestamp: timestamp})
        self.redis_client.expire(key, self.expiration_time_seconds)
        
    def get_request_count(self, ip, start_time, end_time):
        key = f"request_log:{ip}"
        return self.redis_client.zcount(key, start_time, end_time)
    
    def clean_old_requests(self, ip, window_start):
        key = f"request_log:{ip}"
        self.redis_client.zremrangebyscore(key, '-inf', window_start)
