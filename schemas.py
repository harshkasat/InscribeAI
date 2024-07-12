from pydantic import BaseModel

class BlogPostCreate(BaseModel):
    title: str
    subdomain: str
    html_content: str
    css_content: str
