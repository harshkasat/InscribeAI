import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from LLM.Config.llm_config import ConfigLLM
from database import SupabaseConfig

class CreateTitle(ConfigLLM):
    
    def __init__(self, title:str, target_audience:str, Desired_tone:str):
        self.title = title
        self.target_audience = target_audience
        self.desired_tone = Desired_tone
        self.supabase = SupabaseConfig().get_config()
        super().__init__()
    
    def create_title(self):

        try:

            prompt = f"""I need a catchy and engaging title for a blog post about {self.title}. 
            The title should be attention-grabbing and relevant to the content.
            1. Main Topic: {self.title}
            2. Target Audience: {self.target_audience} 
            3. Desired Tone: {self.desired_tone}


            Please generate a compelling blog title based on this information.
            Give me only one title"""

            response = self.llm.generate_content(prompt)

            return response.text
        except Exception as e:
            print(f'When trying to create title error found: {e}')
    
    def create_subdomain(self):
        # Creating subdomain for blog using Ai
        try:
            except_subdomain = self.supabase.from_("blog_posts").select("subdomain").execute()

            prompt = f"""I need a sub-domain around the title{self.title}. 
            It does not have any -, space, _ or anything just simple lowercase subdomain
            but you have execpt this subdomain: {except_subdomain} because this are already used by other users"""

            response = self.llm.generate_content(prompt)

            return response.text
        except Exception as e:
            print(f'When trying to create subdomain error found: {e}')

# if __name__ == '__main__':
#     title = CreateTitle(title="Machine Learning", target_audience="Kids", Desired_tone="Professional")
#     print(title.create_title())