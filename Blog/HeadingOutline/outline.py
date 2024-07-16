import os
import sys
import json

class CreateHeading():

  def __init__(self, title:str, description:str, keywords:list):

      self.title = title
      self.description = description
      self.keywords = keywords

      super().__init__()


  def create_outline(self):

    try:

      prompt = f"""
      {{
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
        ]
      }}
      """
      prompt = json.loads(prompt)
      return prompt
    except Exception as e:
      print(f'When trying to create the heading error found: {e}')

