from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import ValidationError
from fastapi.middleware.cors import CORSMiddleware


from Redis.RateLimiter.rate_limiter import RateLimiter
from Redis.LimitingAlgo.limiting_algo import RateLimitExceeded

from main import Main

from database import SupabaseConfig
from schemas import BlogAiRequest
from dotenv import load_dotenv
# from mangum import Mangum

load_dotenv()

supabase = SupabaseConfig().get_config()

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
    "http://localhost:5173"
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_subdomain_to_request(request: Request, call_next):
    host = request.headers.get('host')
    subdomain = host.split('.')[0] if host and len(host.split('.')) > 2 else None
    request.state.subdomain = subdomain[8:]
    response = await call_next(request)
    return response

@app.get("/health")
async def get_health():
    return JSONResponse(content={"message": "Server working fine"}, status_code=200)

@app.get('/limited')
def limited(request: Request):
    ip_address = request.client.host

    try:
        RateLimiter.get_instance('SlidingWindow').allow_request(ip_address)
        return {"message": "You are allowed to request"}
    except RateLimitExceeded as e:
        raise e

@app.get("/", response_class=HTMLResponse)
async def read_blog(request: Request):
    try:
        subdomain = request.state.subdomain

        if subdomain is None or subdomain == 'www':
            return JSONResponse(content={"message": "Welcome to the main page"}, status_code=200)

        response = supabase.from_("blog_posts").select("*").eq("subdomain", subdomain).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail=f"Blog post not found!")
    except ValidationError as ve:
        raise HTTPException(status_code=400, detail=f'Error when creating blog: {ve[0].msg}')

    blog_post = response.data[0]

    html_content = blog_post["html_content"]
    css_content = blog_post["css_content"]

    combined_content = f"""
    <html>
        <head>
            <style>
                {css_content}
            </style>
        </head>
        <body>
            {html_content}
        </body>
    </html>
    """
    return HTMLResponse(content=combined_content)

@app.post("/create_blog/", status_code=200)
async def create_blog_post(request: Request, blog_request: BlogAiRequest):
    try:
        try:
            with open('templates/style.css', 'r') as file:
                css_content = file.read()
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="CSS file not found")

        host = request.headers.get("host")
        
        blog_ai = {
            "blog_name": blog_request.blog_name,
            "add_website_link": blog_request.add_website_link,
            "target_audience": blog_request.target_audience,
            "desired_tone": blog_request.desired_tone,
        }
        
        # Assuming the rate limiter should be active
        # RateLimiter.get_instance('SlidingWindow').allow_request(request.client.host)
        
        blog_response, subdomain = Main.main(blog_title=blog_ai["blog_name"], 
                                        website_url_list=blog_ai["add_website_link"],
                                        target_audience=blog_ai["target_audience"],
                                        desired_tone=blog_ai["desired_tone"])

    except ValidationError as e:
        raise HTTPException(status_code=400, detail=f'Error when creating blog: {e}')

    response = supabase.from_("blog_posts").insert(
        {"title": blog_request.blog_name, "subdomain": subdomain, "html_content": blog_response, "css_content": css_content}
    ).execute()

    if not response.data:
        raise HTTPException(status_code=400, detail="Error creating blog post")

    return JSONResponse(content={"url": f"https://{subdomain}.{host}/"})

# added mangum adapter
# handler = Mangum(app)
