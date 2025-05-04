from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from Database.db_operations import UserModelOperations

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
        user_info = UserModelOperations(user_email=user.email)
        if user_info.user_details['status_code'] == 404:
            create_user = user_info.create_user()
            if create_users['status_code'] == 201:
                return JSONResponse({
                    "message":"User created successfully",
                    "user_details":create_user
                },
                status_code=201
                )
        return JSONResponse({
            "message":"Internal Error",
            "user_details":user_info.user_details
        },
        status_code=500
        )
    except Exception as e:
        print(f"Error when creating user: {e}")
        return JSONResponse(
            {"message":f"Error when creating user: {e}"},
            status_code=500
            )

@router.get("/list_user/")
async def list_user(user_email):
    try:
        user = UserModelOperations(user_email=user_email)
        if user.user_details['status_code'] == 200:
            users_details = user.list_all_user()
            return JSONResponse(
                {
                "message":"User created successfully",
                "user_details": users_details
                },
                status_code=200
                )
        return JSONResponse(
            content=user.user_details,
            status_code=500
            )

    except Exception as e:
        print(f"Error retrieving task status: {e}")
        return JSONResponse(
            {"message":f"Error retrieving task status: {e}"},
            status_code=500
            )

@router.delete("/delete_user/")
async def delete_user(user:UserModel):
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
async def check_credits(user_email:str):
    try:
        user = UserModelOperations(user_email=user_email)
        print(user.user_details)
        if user.user_details['status_code'] == 200:
            user_credit = user.check_credits()
            return JSONResponse({
                "message":"User credit checked successfully",
                "user_details":user_credit
            },
            status_code=200
            )
        return JSONResponse(
            content=user.user_details,
            status_code=500
        )
    except Exception as e:
        print(f"Error retrieving task status: {e}")
        return JSONResponse(
            {"message":f"Error retrieving credit status: {e}"},
            status_code=500
            )