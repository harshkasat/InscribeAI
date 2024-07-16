import os
import sys
import json
import time

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

# from Blog.HeadingOutline.outline import CreateHeading
from LLM.Config.llm_config import ConfigLLM
# from Blog.Title.title import CreateTitle
class BlogGeneration(ConfigLLM):

    def __init__(self, json_response:json, title:str,  web_scrape) -> None:
        
        self.json_response = json.loads(json_response)
        self.blog_title = title
        self.context = web_scrape
        super().__init__()


    def create_blog(self):

        try:
            sections = self.json_response['sections']
        except Exception as e:
            print(f'When trying to load JSON data error found: {e}')

        result = f'<h1> {self.blog_title} </h1> \n\n'

        try:
            for section in sections:

                blog_prompt = f"""I want to write a Content. Below are the headers, context information,\
                    and key points for each paragraph. Please generate a Content based on this Markdown. \
                    Heading: {section['Heading']} and key points for each paragraph: {section['Description']}, \
                    Context:{self.context}."""

                generate_blog = self.llm.generate_content(blog_prompt)

                result +=  generate_blog.text +  "\\n"
            return result
                    
        except Exception as e:
            print(f'When trying to create the blog error found: {e}')
