from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from utils.jwt_simple import verify_token

def get_tokens_from_cookie(request:Request):
    access_token = request.cookies.get("access_token")
    print("access token", access_token)
    return verify_token(access_token)


def get_refresh_tokens_from_cookie(request:Request):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=400, detail="Refresh token required")
    
    return verify_token(refresh_token)
