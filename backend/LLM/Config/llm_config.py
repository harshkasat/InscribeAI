import os
from dotenv import load_dotenv
import google.generativeai as genai
from LLM import SAFE, SYSTEM_PROMPT

load_dotenv()



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

            self.gemini_pro_vision_models = genai.GenerativeModel(
                'models/gemini-pro-vision', 
                safety_settings=SAFE,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                ),
                system_instruction=SYSTEM_PROMPT
            )
        except Exception as e:
            print(f'When trying to configure the gemini pro vision model error found: {e}')

        # Configure the gemini pro model Content Creation
        try:
            self.llm = genai.GenerativeModel('models/gemini-2.5-pro-exp-03-25')
        except Exception as e:
            print(f'When trying to configure the gemini pro model error found: {e}')
