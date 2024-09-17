import os
import sys
import json

class CreateHeading():

  def __init__(self, title:str, description:str):

      self.title = title
      self.description = description

      super().__init__()


  def create_outline(self):

    try:

      prompt = f"""
      {{
        "sections": [
          {{
            "Heading": "Introduction",
            "Description": "Start with a simple and clear sentence.\\nProvide necessary background on the topic.\\nState the goal of the blog post.\\nBriefly mention what the reader will learn."
          }},
          {{
            "Heading": "Section 1: Topic Overview",
            "Description": "Give a brief overview of the topic.\\nDefine key terms or concepts.\\nUse basic examples."
          }},
          {{
            "Heading": "Section 2: Important Components",
            "Description": "List and explain the main components related to the topic.\\nProvide straightforward explanations and simple examples."
          }},
          {{
            "Heading": "Section 3: How-To Steps",
            "Description": "Describe the steps to achieve a specific outcome.\\nOffer a clear step-by-step guide.\\nInclude basic tips."
          }},
          {{
            "Heading": "Section 4: Common Issues",
            "Description": "Mention common problems or misconceptions.\\nProvide easy-to-follow solutions or advice."
          }}
        ]
      }}
      """
      prompt = json.loads(prompt)
      return prompt
    except Exception as e:
      print(f'When trying to create the heading error found: {e}')

