# pylint: skip-file
import json
import time


from LLM.Config.llm_config import ConfigLLM
class BlogGeneration(ConfigLLM):

    def __init__(self, json_response:json,  web_scrape, seo_keyword) -> None:
        self.json_response = json_response
        self.context = web_scrape
        self.seo_keyword = seo_keyword
        super().__init__()


    def create_blog(self):

        try:
            sections = self.json_response['sections']
        except Exception as e:
            print(f'When trying to load JSON data, an error was found: {e}')
            return None  # Return None if JSON data cannot be loaded

        result = ""

        try:
            for section in sections:
                # Include the already generated content in the prompt to avoid repetition
                blog_prompt = blog_prompt = f"""
                    I want to write a json format. Below are the headers, context information, and key points for each paragraph. 
                    - Heading: {section['Heading']}

                    - Key points for each paragraph: {section['Description']}

                    - Context: {self.context}

                    - SEO Keywords: {self.seo_keyword}

                    - Previously generated content (to avoid repetition): {result}

                    Please generate unique content for this section, ensuring it does not repeat information from previously generated sections. 
                    Focus on the specific key points provided for this section and expand on them with relevant details and examples.
                    """

                generate_blog = self.llm.generate_content(blog_prompt)
                result += generate_blog.text + "\\n"

            return result

        except Exception as e:
            print(f'When trying to create the blog, an error was found: {e}')
            return None  # Return None if there is an error in generating the content
