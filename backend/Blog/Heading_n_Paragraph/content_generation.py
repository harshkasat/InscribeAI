# Example of how to use the system instruction and content prompt in your application
# pylint: skip-file
import json
from typing import List, Dict
# Initialize with your LLM client
from LLM import BLOG_PROMPT
from LLM.Config.llm_config import ConfigLLM  # Replace with your actual import
# llm_client = ConfigLLM() # Initialize your LLM client



class BlogGenerator(ConfigLLM):
        
    def generate_blog(self, blog_topic: str,
                      seo_keywords: str,
                      target_audience: str,
                      sections: List[Dict[str, str]],
                      desired_tone: str = "Informative",
                      context: str = "Blog") -> Dict:
        """
        Generate a complete blog post with all sections.
        
        Args:
            blog_topic: The main topic of the blog
            seo_keywords: SEO keywords to include
            target_audience: Description of the target audience
            sections: List of section dictionaries with 'Heading' and 'Description' keys
            
        Returns:
            Dict: Complete Tiptap JSON document
        """
        result = {
            "type": "doc",
            "content": []
        }
        
        # Title section (H1)
        result["content"].append({
            "type": "heading",
            "attrs": {
                "textAlign": "center",
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": blog_topic
                }
            ]
        })
        
        # Generate each section
        previous_content = ""
        for section in sections:
            # Create content prompt for this section
            content_prompt = self._create_section_prompt(
                blog_topic=blog_topic,
                section_heading=section["Heading"],
                section_description=section["Description"],
                target_audience=target_audience,
                seo_keywords=seo_keywords,
                desired_tone=desired_tone,
                context=context,
                previous_content=previous_content
            )
            
            # Generate section content
            section_content = self._generate_section_content(content_prompt)
            
            # Parse the JSON response
            try:
                section_json = json.loads(section_content)
                # Add section content to the result
                if isinstance(section_json, list):
                    result["content"].extend(section_json)
                else:
                    result["content"].append(section_json)
                
                # Update previous content for context in next section
                previous_content += self._extract_text_content(section_json)
                
            except json.JSONDecodeError as e:
                print(f"Error parsing JSON for section {section['Heading']}: {e}")
                # Handle error - maybe retry or use a fallback
        
        # Add conclusion if not already included
        if not any(node.get("content", [{}])[0].get("text", "") == "Conclusion" 
                  for node in result["content"] if node["type"] == "heading"):
            self._add_conclusion(result, blog_topic)
            
        with open("generated_blog.json", "w") as f:
            json.dump(result, f, indent=2)
        return result
    
    def _create_section_prompt(self, blog_topic, section_heading, section_description, 
                              target_audience, seo_keywords, previous_content,
                              desired_tone="Informative", context="Blog"):
        """Create the prompt for a specific section."""
        
        return BLOG_PROMPT.format(
            blog_topic=blog_topic,
            section_heading=section_heading,
            section_description=section_description,
            target_audience=target_audience,
            seo_keywords=seo_keywords,
            desired_tone=desired_tone,
            context=context,
            previous_content=previous_content[:1000]  # Limit previous content size
        )
    
    def _generate_section_content(self, content_prompt):
        """Generate content for a section using the LLM."""
        # This is a placeholder for your actual LLM call
        # Replace with your actual implementation based on your LLM client
        response = self.llm_response_handler(content=content_prompt)
        return response
    
    # def _extract_json_from_response(self, text):
    #     """Extract JSON content from an LLM response that may include markdown code blocks."""
    #     import re
        
    #     # Try to find JSON inside code blocks
    #     json_pattern = r"```(?:json)?\s*([\s\S]*?)```"
    #     json_matches = re.findall(json_pattern, text, re.DOTALL)
        
    #     if json_matches:
    #         # Return the first JSON match found
    #         return json_matches[0].strip()
        
    #     # If no code blocks, try to find JSON array directly
    #     array_pattern = r"\[\s*\{.+\}\s*\]"
    #     array_matches = re.findall(array_pattern, text, re.DOTALL)
        
    #     if array_matches:
    #         return array_matches[0].strip()
            
    #     # If no JSON found, return the original text
    #     # This will likely cause a JSON parsing error, which is caught in the calling method
    #     return text
    
    def _extract_text_content(self, json_content):
        """Extract plain text from JSON content for context in next sections."""
        text = ""
        
        if isinstance(json_content, dict):
            if json_content.get("type") == "text":
                text += json_content.get("text", "")
            
            for item in json_content.get("content", []):
                text += self._extract_text_content(item)
                
        elif isinstance(json_content, list):
            for item in json_content:
                text += self._extract_text_content(item)
                
        return text
    
    def _add_conclusion(self, result, blog_topic):
        """Add a conclusion section if not already present."""
        conclusion_section = {
            "type": "heading",
            "attrs": {"textAlign": "left", "level": 2},
            "content": [{"type": "text", "text": "Conclusion"}]
        }
        
        conclusion_paragraph = {
            "type": "paragraph",
            "attrs": {"textAlign": "left"},
            "content": [
                {"type": "text", "text": f"In conclusion, we've explored {blog_topic} in detail. "},
                {"type": "text", "text": "We hope this guide helps you apply these concepts effectively. "},
                {"type": "text", "marks": [{"type": "bold"}], "text": "Remember to practice regularly "},
                {"type": "text", "text": "and refer back to this guide whenever needed."}
            ]
        }
        
        result["content"].append(conclusion_section)
        result["content"].append(conclusion_paragraph)


# Usage example:
# if __name__ == "__main__":
    
#     blog_generator = BlogGenerator()
    
#     # Example blog configuration
#     blog_topic = "Advanced Reranking RAG"
#     seo_keywords = "python beginner, learn python, python tutorial, python basics"
#     target_audience = "Beginner"
    

#     sections= [
#           {
#             "Heading": "Introduction",
#             "Description": "Start with a simple and clear sentence.\\nProvide necessary background on the topic.\\nState the goal of the blog post.\\nBriefly mention what the reader will learn."
#           },
#           {
#             "Heading": "Section 1: Topic Overview",
#             "Description": "Give a brief overview of the topic.\\nDefine key terms or concepts.\\nUse basic examples."
#           },
#           {
#             "Heading": "Section 2: Important Components",
#             "Description": "List and explain the main components related to the topic.\\nProvide straightforward explanations and simple examples."
#           },
#           {
#             "Heading": "Section 3: How-To Steps",
#             "Description": "Describe the steps to achieve a specific outcome.\\nOffer a clear step-by-step guide.\\nInclude basic tips."
#           },
#           {
#             "Heading": "Section 4: Common Issues",
#             "Description": "Mention common problems or misconceptions.\\nProvide easy-to-follow solutions or advice."
#           }
#         ]
    
#     # Generate the blog
#     blog_content = blog_generator.generate_blog(
#         blog_topic=blog_topic,
#         seo_keywords=seo_keywords,
#         target_audience=target_audience,
#         sections=sections,
#         desired_tone="Informative",
#         context="uild an Advanced Reranking-RAG System Using Llama-Index, Llama 3 and Qdrant 3ListenShareIntroduction " \
#         "LLMs, despite their ability to generate meaningful and grammatically correct text, face a challenge known as " \
#         "hallucination. Hallucination in LLMs refers to their tendency to confidently produce incorrect answers, creating " \
#         "false information that can appear convincing. This issue has been prevalent since the inception of " \
#         "LLMs and often results in inaccurate and factually incorrect outputs."
#     )
    
#     # Save the generated blog content
#     with open("generated_blog.json", "w") as f:
#         json.dump(blog_content, f, indent=2)
    
#     print("Blog generation complete!")
