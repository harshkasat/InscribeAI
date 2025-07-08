
from fastapi import APIRouter, Request, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from Database.db_operations import UserModelOperations
from utils.jwt_simple import create_access_token, create_refresh_token, verify_token

class UserModel(BaseModel):
    email: str = Field(min_length=5)


router = APIRouter(
    prefix='/db_operation',
    responses={404: {"description": "Not found"}}
)

@router.get("/")
async def check_route_health():
    try:
        return JSONResponse(
            {"message":"DB route is working"},
            status_code=200
            )
    except Exception as e:
        print(f"Error retrieving task status: {e}")
        return JSONResponse(
            {"message":f"Error retrieving task status: {e}"},
            status_code=500
            )

@router.post("/create_user/")
async def create_users(user:UserModel):
    try:
        if not user.email:
            raise HTTPException(status_code=400, detail="Email required")
        _user = UserModelOperations(user_email=user.email)
        user_info = _user.check_user_exists()

        if user_info["status_code"] == 200:
            access_token = create_access_token(user.email)
            refresh_token = create_refresh_token(user.email)
            response = JSONResponse({
                    "message": "User created successfully",
                    "user_details": user_info,
                }, status_code=201)
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=False,
                max_age=60 * 30
            )
            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=False,
                max_age=60 * 30
            )
            return response

        if  user_info['status_code'] == 404:
            create_user = _user.create_user()
            if create_user['status_code'] == 201:
                access_token = create_access_token(user.email)
                refresh_token = create_refresh_token(user.email)
                response = JSONResponse({
                    "message": "User created successfully",
                    "user_details": create_user,
                }, status_code=201)

                response.set_cookie(
                    key="access_token",
                    value=access_token,
                    httponly=True,
                    secure=False,
                    max_age=60 * 30
                )
                response.set_cookie(
                        key="refresh_token",
                        value=refresh_token,
                        httponly=True,
                        secure=False,
                        max_age=60 * 30
                    )
                return response
            else:
                return JSONResponse({
                    "message" : create_user
                }, status_code=500)
        return JSONResponse({
            "message": "Internal Error",
            "user_details": user_info
        }, status_code=500)
    except Exception as e:
        print(f"Error when creating user: {e}")
        return JSONResponse(
            {"message": f"Error when creating user: {e}"},
            status_code=500
        )


@router.get("/list_user/")
async def list_user(user_email, token: str = Depends(verify_token)):
    try:
        user = UserModelOperations(user_email=user_email)
        if user.check_user_exists()['status_code'] == 200:
            users_details = user.list_all_user()
            return JSONResponse(
                {
                "message":"User created successfully",
                "user_details": users_details
                },
                status_code=200
                )
        return JSONResponse(
            content=user.check_user_exists(),
            status_code=500
            )
    except Exception as e:
        print(f"Error retrieving task status: {e}")
        return JSONResponse(
            {"message":f"Error retrieving task status: {e}"},
            status_code=500
            )

@router.delete("/delete_user/")
async def delete_user(user:UserModel, token: str = Depends(verify_token)):
    try:
        delete_user = UserModelOperations(user_email=user.email).delete_user()
        return JSONResponse({
            "message":"User deleted successfully",
            "user_details": delete_user
        },
        status_code=200
        )
    except Exception as e:
        print(f"Error retrieving task status: {e}")
        return JSONResponse(
            {"message":f"Error retrieving task status: {e}"},
            status_code=500
            )

@router.get("/check_credits/")
async def check_credits(user_email: str, token: str = Depends(verify_token)):
    try:
        user = UserModelOperations(user_email=user_email)
        print(user.check_user_exists())
        if user.check_user_exists()['status_code'] == 200:
            user_credit = user.check_credits()
            return JSONResponse({
                "message":"User credit checked successfully",
                "user_details":user_credit
            },
            status_code=200
            )
        return JSONResponse(
            content=user.check_user_exists(),
            status_code=500
        )
    except Exception as e:
        print(f"Error retrieving task status: {e}")
        return JSONResponse(
            {"message":f"Error retrieving credit status: {e}"},
            status_code=500
            )