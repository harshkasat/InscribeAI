import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

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
        I have given you some more extentral information: {self.description}. Also use This SEO keyword: {self.keywords} to get more hits.      
        Create a JSON representation of a blog post based on the provided title. The JSON should contain the main sections, each with multiple subsections, and descriptions. The structure of the JSON should be as follows:

        {{
          "title": "{self.title}",
          "sections": [
            {{
              "main_heading": "Main Section 1 Heading",
              "subsections": [
                {{
                  "sub_heading": "Subsection 1.1 Heading",
                  "description": "Description of Subsection 1.1"
                }},
                {{
                  "sub_heading": "Subsection 1.2 Heading",
                  "description": "Description of Subsection 1.2"
                }},
                {{
                  "sub_heading": "Subsection 1.3 Heading",
                  "description": "Description of Subsection 1.3"
                }}
              ]
            }},
            {{
              "main_heading": "Main Section 2 Heading",
              "subsections": [
                {{
                  "sub_heading": "Subsection 2.1 Heading",
                  "description": "Description of Subsection 2.1"
                }},
                {{
                  "sub_heading": "Subsection 2.2 Heading",
                  "description": "Description of Subsection 2.2"
                }},
                {{
                  "sub_heading": "Subsection 2.3 Heading",
                  "description": "Description of Subsection 2.3"
                }}
              ]
            }},
            {{
              "main_heading": "Main Section 3 Heading",
              "subsections": [
                {{
                  "sub_heading": "Subsection 3.1 Heading",
                  "description": "Description of Subsection 3.1"
                }},
                {{
                  "sub_heading": "Subsection 3.2 Heading",
                  "description": "Description of Subsection 3.2"
                }},
                {{
                  "sub_heading": "Subsection 3.3 Heading",
                  "description": "Description of Subsection 3.3"
                }}
              ]
            }},
            {{
              "main_heading": "Main Section 4 Heading",
              "subsections": [
                {{
                  "sub_heading": "Subsection 4.1 Heading",
                  "description": "Description of Subsection 4.1"
                }},
                {{
                  "sub_heading": "Subsection 4.2 Heading",
                  "description": "Description of Subsection 4.2"
                }},
                {{
                  "sub_heading": "Subsection 4.3 Heading",
                  "description": "Description of Subsection 4.3"
                }}
              ]
            }},
            {{
              "main_heading": "Main Section 5 Heading",
              "subsections": [
                {{
                  "sub_heading": "Subsection 5.1 Heading",
                  "description": "Description of Subsection 5.1"
                }},
                {{
                  "sub_heading": "Subsection 5.2 Heading",
                  "description": "Description of Subsection 5.2"
                }},
                {{
                  "sub_heading": "Subsection 5.3 Heading",
                  "description": "Description of Subsection 5.3"
                }}
              ]
            }},
            {{
              "main_heading": "Main Section 6 Heading",
              "subsections": [
                {{
                  "sub_heading": "Subsection 6.1 Heading",
                  "description": "Description of Subsection 6.1"
                }},
                {{
                  "sub_heading": "Subsection 6.2 Heading",
                  "description": "Description of Subsection 6.2"
                }},
                {{
                  "sub_heading": "Subsection 6.3 Heading",
                  "description": "Description of Subsection 6.3"
                }}
              ]
            }},
            {{
              "main_heading": "Main Section 7 Heading",
              "subsections": [
                {{
                  "sub_heading": "Subsection 7.1 Heading",
                  "description": "Description of Subsection 7.1"
                }},
                {{
                  "sub_heading": "Subsection 7.2 Heading",
                  "description": "Description of Subsection 7.2"
                }},
                {{
                  "sub_heading": "Subsection 7.3 Heading",
                  "description": "Description of Subsection 7.3"
                }}
              ]
            }}
          ],
          "conclusion": "Conclude your blog post, summarizing key points or providing closing thoughts."
        }}
        ONLY GIVE A RESPONSE IN JSON FORMAT ONLY WITHOUT USING ```json
        """

      response = self.llm.generate_content(prompt)

      result = response.text

      return result
    except Exception as e:
      print(f'When trying to create the heading error found: {e}')

# if __name__ == '__main__':

#   title = CreateTitle(title="Machine Learning", target_audience="Kids", Desired_tone="Professional").create_title()
#   res = CreateHeading(title=title, description=title).create_heading()
#   print(res)
