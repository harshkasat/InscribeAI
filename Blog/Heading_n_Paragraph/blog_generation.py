import os
import sys
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

# from Blog.HeadingOutline.outline import CreateHeading
from LLM.Config.llm_config import ConfigLLM
# from Blog.Title.title import CreateTitle
class BlogGeneration(ConfigLLM):

    def __init__(self, json_response:json, title:str) -> None:
        
        self.json_response = json.loads(json_response)
        self.blog_title = title
        super().__init__()

        self.sections = self.json_response['sections']


    def creating_blog(self):

        result = f"** Blog Title: {self.blog_title} ** \n\n "
        try:
            for section in self.sections:
                main_heading = section['main_heading']
                subsections = section['subsections']
                for subsection in subsections:
                    sub_heading = subsection['sub_heading']
                    description = subsection['description']

                    description = self.llm.generate_content(f"Use max token you have{description}")

                    result +=  f"Main Heading: {main_heading}\n\n Sub Heading: {sub_heading}\n\n Descriptive: {description.text}\n\n\n"
        
            return result
                    
        except Exception as e:
            print(f'When trying to create the heading error found: {e}')


# if __name__ == '__main__':

#     title = CreateTitle(title="Machine Learning", target_audience="Professional Engineer", Desired_tone="Professional").create_title()
#     res = CreateHeading(title=title, description=title).create_heading()
    
#     response = BlogGeneration(json_response=res, blog_title=title).creating_group()
#     print(response)