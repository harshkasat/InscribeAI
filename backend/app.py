from fastapi import FastAPI, HTTPException,Request
from pydantic import BaseModel, Field, ValidationError, field_validator
from Redis.RateLimiter.rate_limiter import RateLimiter
from Redis.LimitingAlgo.limiting_algo import RateLimitExceeded
from main import Main

app = FastAPI()
ip_addresses = {}


class BlogAiRequest(BaseModel):
    blog_name: str = Field(..., title="Blog Name")
    add_website_link: list = Field(..., title="Add Website Link")
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

@app.get("/")
def read_root():
    return {"message": "InscribeAi server is working"}

@app.post('/create_blog/')
def create_blog(request: BlogAiRequest):
    try:
        blog_ai = {
            "blog_name": request.blog_name,
            "add_website_link": request.add_website_link,
            "target_audience": request.target_audience,
            "desired_tone": request.desired_tone,
        }

        blog_response = Main.main(blog_title=blog_ai["blog_name"], 
                                  website_url_list=blog_ai["add_website_link"],
                                  target_audience=blog_ai["target_audience"],
                                  desired_tone=blog_ai["desired_tone"])

        return blog_response

    except ValidationError as e:
        HTTPException(status_code=400, detail=f'Error when creating blog: {e[0].msg}')


@app.get('/limited')
def limited(request: Request):

    client = request.client.host

    try:
        if client not in ip_addresses:
            ip_addresses[client] = RateLimiter.get_instance('SlidingWindow')
        if ip_addresses[client].allow_request():
            return "This is a limited use API"
    except RateLimitExceeded as e:
        raise e
