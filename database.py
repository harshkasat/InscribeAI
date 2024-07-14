import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()



class SupabaseConfig():
    """ This class represents a Supabase Configuration"""

    def __init__(self) -> str:
        
        self.SUPABASE_URL = os.environ.get("SUPABASE_URL")
        self.SUPABASE_KEY = os.environ.get("SUPABASE_API_KEY")

    def get_config(self):
        self.supabase : Client = create_client(self.SUPABASE_URL, self.SUPABASE_KEY)
        return self.supabase
