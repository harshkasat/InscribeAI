from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from Database.db_operations import BlogModelOperations

class BlogModel(BaseModel):
    email: str = Field(min_length=5)
    blog_data: dict

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

@router.post("/create_blog/")
async def create_blog(user_data:BlogModel):
    try:
        user_info = BlogModelOperations(user_email=user_data.email)
        # print(user_info.user_details)
        if user_info.user_details['status_code'] == 200:
            create_user = user_info.create_blog(blog_data=user_data.blog_data)
            if create_user['status_code'] == 201:
                return JSONResponse({
                    "message":"Blog created successfully",
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

@router.get("/list_blogs/")
async def list_blogs(user_email):
    try:
        user = BlogModelOperations(user_email=user_email)
        if user.user_details['status_code'] == 200:
            users_details = user.check_list_blogs()
            if users_details['status_code'] == 200:
                return JSONResponse(
                    users_details,
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

@router.delete("/delete_blog/")
async def delete_blog(user_email, blog_id):
    try:
        delete_blog = BlogModelOperations(user_email=user_email)
        if delete_blog.user_details['status_code'] == 200:
            delete_blog_details = delete_blog.delete_blog(blog_id=blog_id)
            if delete_blog_details['status_code'] == 200:
                return JSONResponse({
                    "message":"User deleted successfully",
                    "user_details": delete_blog
                },
                status_code=200
                )
        return JSONResponse(
            content=delete_blog.user_details,
            status_code=500
            )
    except Exception as e:
        print(f"Error retrieving task status: {e}")
        return JSONResponse(
            {"message":f"Error retrieving task status: {e}"},
            status_code=500
            )
