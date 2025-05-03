import os
from dotenv import load_dotenv
import google.generativeai as genai
from LLM import SAFE, SYSTEM_PROMPT
from utils.extract_json import _extract_json_from_response

load_dotenv()

class ConfigLLM():

    def __init__(self):
        try:
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


    def llm_response_handler(self, content:str):
        try:
            llm = genai.GenerativeModel(
                'models/gemini-2.0-flash',
                safety_settings=SAFE,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                ),
                system_instruction=SYSTEM_PROMPT
            )
            response = llm.generate_content(contents=content)
            # Extract the JSON response
            json_response = _extract_json_from_response(response.text)
            return json_response
        except Exception as e:
            print(f'When trying to configure the Gemini: gemini-2.5-pro-exp-03-25 model error found: {e}')
