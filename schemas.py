from pydantic import BaseModel, Field, ValidationError, field_validator
from typing import List

class BlogAiRequest(BaseModel):
    blog_name: str = Field(..., title="Blog Name")
    add_website_link: List[str] = Field(..., title="Add Website Link")
    target_audience: str = Field(..., title="Target Audience")
    desired_tone: str = Field(..., title="Desired Tone")

    
    @field_validator("blog_name", "desired_tone", "target_audience")
    @classmethod
    def validate_blog_name(cls, value:str):
        if not all(word.isalpha() for word in value.split()):
            raise ValueError("Blog name/ Desired Token/ Target Audience must be alphabetic")
        if not (3 < len(value) < 100):
            raise ValueError("Blog name must be between 3 and 30 characters")
        
        return value
    
    @field_validator("add_website_link")
    @classmethod
    def validate_add_website_link(cls, value:list):

        if not isinstance(value, list):
            raise ValueError("Add website link must be a list")

        for url in value:
            if not url.startswith('http://') and not url.startswith('https://'):
                raise ValueError("Add website link must start with http:// or https://")

        return value

    class Config:
        json_schema_extra = {
            "example": {
                "blog_name": "Build an Advanced Reranking RAG",
                "add_website_link": ["https://nayakpplaban.medium.com/build-an-advanced-reranking-rag-system-using-llama-index-llama-3-and-qdrant-a8b8654174bc"],
                "target_audience": "Beginner",
                "desired_tone": "Informative"
            }
        }
