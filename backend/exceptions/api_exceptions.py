
class APIError(Exception):
    def __init__(self, status_code, message="API request failed"):
        self.status_code = status_code
        self.message = message
        super().__init__(f"{message} (Status Code: {status_code})")
