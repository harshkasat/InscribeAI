from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from utils.jwt_simple import verify_token

def jwt_auth_required(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header"
        )
    token = auth_header.split(" ", 1)[1]
    return verify_token(token)
