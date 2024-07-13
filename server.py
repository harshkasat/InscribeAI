from fastapi import FastAPI, Request, HTTPException, Form
from fastapi.responses import HTMLResponse, JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from supabase import create_client, Client
from schemas import BlogPostCreate
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_API_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

@app.middleware("http")
async def add_subdomain_to_request(request: Request, call_next):
    host = request.headers.get('host')
    subdomain = host.split('.')[0] if host and len(host.split('.')) > 2 else None
    request.state.subdomain = subdomain
    response = await call_next(request)
    return response

@app.get("/", response_class=HTMLResponse)
async def read_blog(request: Request):
    subdomain = request.state.subdomain
    print(subdomain)

    if subdomain is None or subdomain == 'www':
        return JSONResponse(content={"message": "Welcome to the main page"}, status_code=200)
    else:
        subdomain = subdomain[8:]

        response = supabase.from_("blog_posts").select("*").eq("subdomain", subdomain).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Blog post not found!")

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

@app.post("/create_blog/")
async def create_blog_post(
    title: str = Form(...),
    subdomain: str = Form(...),
    html_content: str = Form(...),
    css_content: str = Form(...)
):
    response = supabase.from_("blog_posts").insert(
        {"title": title, "subdomain": subdomain, "html_content": html_content, "css_content": css_content}
    ).execute()

    # if response.status_code != 201:
    #     raise HTTPException(status_code=400, detail="Error creating blog post")
    print(response)

    return {"title": title, "subdomain": subdomain, "html_content": html_content, "css_content": css_content}
