import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

safe = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]

class ConfigLLM():

    def __init__(self):
        try:
            # self.gemini_api_key = os.getenv('GEMINI_API_KEY')
            self.gemini_api_key = os.environ.get('GEMINI_API_KEY')

            if self.gemini_api_key is None:
                raise ValueError ("Gemini API key is not given")
        except :
            raise ValueError("Gemini API key is not valid")
        
        # Configure the gemini pro Vision models
        try:
            genai.configure(api_key = self.gemini_api_key)

            self.gemini_pro_vision_models = genai.GenerativeModel('models/gemini-pro-vision', safety_settings=safe)
        except Exception as e:
            print(f'When trying to configure the gemini pro vision model error found: {e}')

        # Configure the gemini pro model Content Creation
        try:
            self.llm = genai.GenerativeModel('models/gemini-1.5-flash')
        except Exception as e:
            print(f'When trying to configure the gemini pro model error found: {e}')
