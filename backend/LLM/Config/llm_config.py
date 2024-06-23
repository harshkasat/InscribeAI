import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

class ConfigLLM():

    def __init__(self):
        try:
            self.gemini_api_key = os.getenv('GEMINI_API_KEY')

            if self.gemini_api_key is None:
                raise ValueError ("Gemini API key is not given")
        except :
            raise ValueError("Gemini API key is not valid")
        
        # Configure the gemini pro Vision models
        try:
            genai.configure(api_key = self.gemini_api_key)

            self.gemini_pro_vision_models = genai.GenerativeModel('models/gemini-pro-vision')
        except Exception as e:
            print(f'When trying to configure the gemini pro vision model error found: {e}')

        # Configure the gemini pro model Content Creation
        try:
            self.llm = genai.GenerativeModel('gemini-1.0-pro-latest')
        except Exception as e:
            print(f'When trying to configure the gemini pro model error found: {e}')

# if __name__ == '__main__':
#     config = ConfigLLM()

#     response = config.llm.generate_content("""create a blog on Machine Learning . 
#                                            # Output in json format
#                                            {
#                                             "title": "title of the blog",
#                                             "blog":"blog in the word limit is 500 words per paragraph",
#                                             "summary": "summary of the blog",
#                                             }
#                                            """)
#     print(response.text)