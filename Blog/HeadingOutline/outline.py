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


  def create_heading(self):

    try:

      prompt = f"""Title: {self.title}
        I'm given you some more context information about blog: {self.description}. 
        Also use This SEO keyword: {self.keywords} to get more hits.      
        Create a JSON representation of a blog post based on the provided title.
        The generated JSON representation must use context information and SEO keywords
        The structure of the JSON should be as follows:
        {{
          "title": "{self.title}",
          "sections": [
            {{
              "Heading": "Introduction",
              "Description": "Hook: Start with a captivating sentence, such as a surprising fact, question, or anecdote.
                              Context: Provide some background information on the topic.
                              Purpose: Clearly state the goal of the blog post.
                              Preview: Briefly outline what the reader can expect to learn.",
            }},
            {{
              "Heading":"Section 1: Understanding the Topic"
              "Description": "Introduce the main concept.
                              Provide definitions or explanations
                              Use examples ot illustrate points"
            }},
            {{
              "Heading": "Section 2: Key Components or Skills"
              "Description": "Break down the main components or skills related to the topics.
                              Include detailed explanations and relevant examples
                              Use visuals like charts, graphsm or iamge if applicable"
            }},
            {{
              "Heading": "Section 3: Practical Applications or Steps"
              "Description": "Explain how to apply the informations or steps to achieve a specific goal.
                              Porvide a step by step guide or actionable advice.
                              Include tips, trick and best practices."
            }},
            {{
              "Heading": "Section 4: Challenges and Solutions"
              "Description": "Discuss common challenges or misconceptions.
                              Offer solutions or strategies ot overcome these challenges.
                              User real life examples or case studies to add credibility"
            }}
          ]
          "conclusion": "Conclude your blog post, summarizing key points or providing closing thoughts."
        }}
        ONLY GIVE A RESPONSE IN JSON FORMAT ONLY WITHOUT```json
        """

      response = self.llm.generate_content(prompt)

      result = response.text

      return result
    except Exception as e:
      print(f'When trying to create the heading error found: {e}')

# if __name__ == '__main__':

#   title = CreateTitle(title="Machine Learning", target_audience="Kids", Desired_tone="Professional").create_title()
#   res = CreateHeading(title=title, description=title, keywords=title).create_heading()
#   print(res)
