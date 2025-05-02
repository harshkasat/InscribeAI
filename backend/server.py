from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import ValidationError
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv


# from Redis.RateLimiter.rate_limiter import RateLimiter
# from Redis.LimitingAlgo.limiting_algo import RateLimitExceeded

from main import Main

from schemas import BlogAiRequest

load_dotenv()


app = FastAPI(
    title="BlogAI",
    description="A serverless platform for generating engaging blog posts using AI",
    version="1.0.0",
    openapi_url="/api/docs",
    redoc_url="/api/redoc",
)

origins = [
    "http://localhost:3000",  # Your React app URL
    "https://your-react-app-domain.com", # Your deployed React app URL
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def get_health():
    return JSONResponse(content={"message": "Server working fine"}, status_code=200)

# @app.get('/limited')
# def limited(request: Request):
#     ip_address = request.client.host

#     try:
#         RateLimiter.get_instance('SlidingWindow').allow_request(ip_address)
#         return {"message": "You are allowed to request"}
#     except RateLimitExceeded as e:
#         raise e

@app.get("/", response_class=HTMLResponse)
async def read_blog(request: Request):
    try:
        return HTMLResponse(content="Welcome to BlogAI API", status_code=200)
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=f'Error when creating blog: {e}')

@app.post("/create_blog/", status_code=200)
async def create_blog_post(request: Request, blog_request: BlogAiRequest):
    try:

        blog_ai = {
            "blog_name": blog_request.blog_name,
            "add_website_link": blog_request.add_website_link,
            "target_audience": blog_request.target_audience,
            "desired_tone": blog_request.desired_tone,
        }

        # Assuming the rate limiter should be active
        # RateLimiter.get_instance('SlidingWindow').allow_request(request.client.host)

        blog_response = await Main.main(blog_title=blog_ai["blog_name"],
                                        website_url_list=blog_ai["add_website_link"],
                                        target_audience=blog_ai["target_audience"],
                                        desired_tone=blog_ai["desired_tone"])

        return JSONResponse(
            content={
                "message": "Blog post created successfully",
                "blog_post": blog_response
            },
            status_code=200)

    except ValidationError as e:
        raise HTTPException(status_code=400, detail=f'Error when creating blog: {e}')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
