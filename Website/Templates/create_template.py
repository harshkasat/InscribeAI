import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from LLM.Config.llm_config import ConfigLLM


class Template(ConfigLLM):

    def __init__(self):
        super().__init__()
    
    def generate_template(self, raw_content:str):

        try:
            prompt = f"Can you provide HTML and CSS code for a simple website that displays content? \
            The website should have a header, a main content area, and a footer. \
            The header should have a navigation menu with links to different sections of the website. \
            The main content area should have a section for articles or posts, and the footer should contain contact information. \
            Please make the design clean and responsive. Here is the content: {raw_content}"

            generate_content = self.llm.generate_content(prompt)

            result +=  generate_content.text +  "\\n"
            return result
        except Exception as e:
            print(f"When trying to generate HTML template error found: {e}")