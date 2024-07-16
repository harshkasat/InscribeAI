import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from Blog.Title.title import CreateTitle


from LLM.Config.llm_config import ConfigLLM

class CreateHeading(ConfigLLM):

  def __init__(self, title:str, description:str, keywords:list):

      self.title = title
      self.description = description
      self.keywords = keywords

      super().__init__()


  def create_outline(self):

    try:

      prompt = f"""
Title: {self.title}
I'm giving you some more context information about the blog: {self.description}. 
Also use this SEO keyword: {self.keywords} to get more hits.      
Create a JSON representation of a blog post based on the provided title.
The generated JSON representation must use context information and SEO keywords.
The structure of the JSON should be as follows:
{{
  "title": "{self.title}",
  "sections": [
    {{
      "Heading": "Introduction",
      "Description": "Hook: Start with a captivating sentence, such as a surprising fact, question, or anecdote.\\nContext: Provide some background information on the topic.\\nPurpose: Clearly state the goal of the blog post.\\nPreview: Briefly outline what the reader can expect to learn."
    }},
    {{
      "Heading": "Section 1: Brief about the Topic",
      "Description": "Introduce the main concept.\\nProvide definitions or explanations.\\nUse examples to illustrate points."
    }},
    {{
      "Heading": "Section 2: Key Components",
      "Description": "Break down the main components related to the topics.\\nInclude detailed explanations and relevant examples."
    }},
    {{
      "Heading": "Section 3: Steps",
      "Description": "Explain how to steps to achieve a specific goal.\\nProvide a step by step guide or actionable advice.\\nInclude tips, tricks, and best practices."
    }},
    {{
      "Heading": "Section 4: Overview",
      "Description": "Discuss common misconceptions.\\nOffer solutions or strategies for overview."
    }}
  ],
  "conclusion": "Conclude your blog post, summarizing key points or providing closing thoughts."
}}
ONLY GIVE A RESPONSE IN JSON FORMAT WITHOUT```json .
"""


      response = self.llm.generate_content(prompt)

      result = response.text

      return result
    except Exception as e:
      print(f'When trying to create the heading error found: {e}')

