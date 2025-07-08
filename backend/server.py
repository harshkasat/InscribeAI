from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.responses import  JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from Router import user_db_router, blog_db_router
from utils.jwt_simple import verify_token, create_access_token
from utils.jwt_auth import get_tokens_from_cookie, get_refresh_tokens_from_cookie


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
    try:
        return JSONResponse(content={"message": "Server working fine"}, status_code=200)
    except HTTPException as e:
        return JSONResponse({
            "message": e
        }, status_code=500)


@app.post("/refresh_token")
async def refresh_token_api(payload = Depends(get_refresh_tokens_from_cookie)):

    email = payload.get("sub")
    new_access_token = create_access_token(email)

    return JSONResponse({
        "access_token": new_access_token
    })

@app.get("/protected")
async def protected(payload=Depends(get_tokens_from_cookie)):

    email = payload.get("sub")
    return JSONResponse({"message": f"Hello, {email}. Access granted."})


PREFIX = '/api/v1'
app.include_router(
    user_db_router.router,
    prefix=PREFIX,
    tags=["User DB Route"]
)

app.include_router(
    blog_db_router.router,
    prefix=PREFIX,
    tags=["Blog DB Route"]
)

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
