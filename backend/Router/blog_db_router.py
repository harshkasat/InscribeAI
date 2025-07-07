from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from Database.db_operations import BlogModelOperations
from schemas import BlogAiRequest

from blog_content_generation import BlogGeneration
from utils.jwt_auth import jwt_auth_required


class BlogModel(BlogAiRequest):
    email: str = Field(min_length=5)


class BlogUpdate(BaseModel):
    blog_id: str
    blog_data: dict = Field(...)


router = APIRouter(
    prefix="/db_operation", responses={404: {"description": "Not found"}}
)


@router.post("/create_blog/")
async def create_blog(blog_request: BlogModel, payload=Depends(jwt_auth_required)):
    try:
        blog_ai = {
            "blog_name": blog_request.blog_name,
            "add_website_link": blog_request.add_website_link,
            "target_audience": blog_request.target_audience,
            "desired_tone": blog_request.desired_tone,
        }
        try:
            blog_response = await BlogGeneration.blog_generate(
                blog_title=blog_ai["blog_name"],
                website_url_list=blog_ai["add_website_link"],
                target_audience=blog_ai["target_audience"],
                desired_tone=blog_ai["desired_tone"],
            )
        except Exception as e:
            print(f"Error generating blog content: {e}")
            return JSONResponse(
                {"message": f"Error generating blog content: {e}"}, status_code=500
            )
        # Extract user_email from JWT payload if present, else fallback to request body
        user_email = (
            payload.get("sub") if payload and "sub" in payload else blog_request.email
        )
        _user = BlogModelOperations(user_email=user_email)
        user_info = _user.check_user_exists()
        if user_info["status_code"] in [200, 201]:
            create_user = _user.create_blog(blog_data=blog_response)
            # print(create_user)
            if create_user["status_code"] == 201:
                return JSONResponse(
                    {
                        "message": "Blog created successfully",
                        "user_details": create_user,
                    },
                    status_code=201,
                )
        return JSONResponse(
            {"message": "Internal Error", "user_details": user_info}, status_code=500
        )
    except Exception as e:
        print(f"Error when creating user: {e}")
        return JSONResponse(
            {"message": f"Error when creating user: {e}"}, status_code=500
        )


@router.get("/list_blogs/")
async def list_blogs(payload=Depends(jwt_auth_required)):
    try:
        user_email = payload.get("sub") if payload and "sub" in payload else None
        if not user_email:
            return JSONResponse(
                {"message": "Invalid or missing user in token"}, status_code=401
            )
        _user = BlogModelOperations(user_email=user_email)
        user_info = _user.check_user_exists()
        if user_info["status_code"] == 200:
            blog_lists = _user.check_list_blogs()
            if blog_lists["status_code"] == 200:
                return JSONResponse(blog_lists, status_code=200)
        return JSONResponse(content=user_info, status_code=500)
    except Exception as e:
        print(f"Error retrieving task status: {e}")
        return JSONResponse(
            {"message": f"Error retrieving task status: {e}"}, status_code=500
        )


@router.delete("/delete_blog/")
async def delete_blog(blog_id, payload=Depends(jwt_auth_required)):
    try:
        user_email = payload.get("sub") if payload and "sub" in payload else None
        if not user_email:
            return JSONResponse(
                {"message": "Invalid or missing user in token"}, status_code=401
            )
        _user = BlogModelOperations(user_email=user_email)

        user_info = _user.check_user_exists()

        if user_info["status_code"] == 200:
            delete_blog_details = _user.delete_blog(blog_id=blog_id)
            if delete_blog_details["status_code"] == 200:
                return JSONResponse(
                    {
                        "message": "User deleted successfully",
                        "user_details": delete_blog,
                    },
                    status_code=200,
                )
        return JSONResponse(content=user_info, status_code=500)
    except Exception as e:
        print(f"Error retrieving task status: {e}")
        return JSONResponse(
            {"message": f"Error retrieving task status: {e}"}, status_code=500
        )


@router.get("/get_blog/")
async def get_blog(blog_id, payload=Depends(jwt_auth_required)):
    try:
        user_email = payload.get("sub") if payload and "sub" in payload else None
        if not user_email:
            return JSONResponse(
                {"message": "Invalid or missing user in token"}, status_code=401
            )
        _user = BlogModelOperations(user_email=user_email)

        user_info = _user.check_user_exists()

        if user_info["status_code"] == 200:
            get_blog_details = _user.get_blog(blog_id=blog_id)
            if get_blog_details["status_code"] == 200:
                return JSONResponse(
                    {
                        "message": "User blog successfully",
                        "blog_data": get_blog_details["blog_data"],
                    },
                    status_code=200,
                )
        return JSONResponse(content=user_info, status_code=500)
    except Exception as e:
        print(f"Error retrieving get_blog status: {e}")
        return JSONResponse(
            {"message": f"Error retrieving get_blog status: {e}"}, status_code=500
        )


@router.put("/update_blog/")
async def update_blog(user_data: BlogUpdate, payload=Depends(jwt_auth_required)):
    try:
        user_email = payload.get("sub") if payload and "sub" in payload else None
        if not user_email:
            return JSONResponse(
                {"message": "Invalid or missing user in token"}, status_code=401
            )
        _user = BlogModelOperations(user_email=user_email)

        user_info = _user.check_user_exists()

        if user_info["status_code"] == 200:
            update_blog_details = _user.update_blog(
                blog_id=user_data.blog_id, blog_data=user_data.blog_data
            )
            if update_blog_details["status_code"] == 200:
                return JSONResponse(
                    {
                        "message": "Blog update successfully",
                        "blog_id": update_blog_details["blog_id"],
                        "blog_data": update_blog_details["blog_data"],
                    },
                    status_code=200,
                )
        return JSONResponse(content=user_info, status_code=500)
    except Exception as e:
        print(f"Error retrieving update_blog status: {e}")
        return JSONResponse(
            {"message": f"Error retrieving update_blog status: {e}"}, status_code=500
        )
