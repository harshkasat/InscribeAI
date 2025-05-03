import os
import sys
import json


class CreateHeading:

  def __init__(self, title: str, description: str):
    self.title = title
    self.description = description

  def create_outline(self):
    try:
      sections =  [
        {
          "Heading": "Introduction",
          "Description": "Start with a simple and clear sentence.\\nProvide necessary background on the topic.\\nState the goal of the blog post.\\nBriefly mention what the reader will learn."
        },
        {
          "Heading": "Section 1: Topic Overview",
          "Description": "Give a brief overview of the topic.\\nDefine key terms or concepts.\\nUse basic examples."
        },
        {
          "Heading": "Section 2: Important Components",
          "Description": "List and explain the main components related to the topic.\\nProvide straightforward explanations and simple examples."
        },
        {
          "Heading": "Section 3: How-To Steps",
          "Description": "Describe the steps to achieve a specific outcome.\\nOffer a clear step-by-step guide.\\nInclude basic tips."
        },
        {
          "Heading": "Section 4: Common Issues",
          "Description": "Mention common problems or misconceptions.\\nProvide easy-to-follow solutions or advice."
        }
        ]
      return sections
    except Exception as e:
      print(f"When trying to create the heading error found: {e}")

if __name__ == "__main__":
  response = CreateHeading("Advanced Reranking RAG", "This blog post will explore the advanced techniques of reranking in retrieval-augmented generation (RAG) systems. We will cover the key concepts, components, and practical applications of these techniques.")
  result = response.create_outline()
  print(result)
