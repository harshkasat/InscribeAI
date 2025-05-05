from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from Database.db_operations import BlogModelOperations
from schemas import BlogAiRequest
from blog_content_generation import BlogGeneration


class BlogModel(BlogAiRequest):
    email: str = Field(min_length=5)


class BlogUpdate(BaseModel):
    user_email: str = Field(min_length=5)
    blog_id: str
    blog_data: dict = Field(...)

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
async def create_blog(blog_request:BlogModel):
    try:
        blog_ai = {
            "blog_name": blog_request.blog_name,
            "add_website_link": blog_request.add_website_link,
            "target_audience": blog_request.target_audience,
            "desired_tone": blog_request.desired_tone,
        }
        try:
            blog_response = await BlogGeneration.blog_generate(blog_title=blog_ai["blog_name"],
                                        website_url_list=blog_ai["add_website_link"],
                                        target_audience=blog_ai["target_audience"],
                                        desired_tone=blog_ai["desired_tone"])
        except Exception as e:
            print(f"Error generating blog content: {e}")
            return JSONResponse(
                {"message":f"Error generating blog content: {e}"},
                status_code=500
                )
        user_info = BlogModelOperations(user_email=blog_request.email)
        # print(user_info.user_details)
        if user_info.user_details['status_code'] in [200, 201]:
            create_user = user_info.create_blog(blog_data=blog_response)
            # print(create_user)
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

@router.get("/get_blog/")
async def get_blog(user_email, blog_id):
    try:
        get_blog = BlogModelOperations(user_email=user_email)
        if get_blog.user_details['status_code'] == 200:
            get_blog_details = get_blog.get_blog(blog_id=blog_id)
            if get_blog_details['status_code'] == 200:
                return JSONResponse({
                    "message":"User blog successfully",
                    "blog_data": get_blog_details['blog_data']
                },
                status_code=200
                )
        return JSONResponse(
            content=get_blog.user_details,
            status_code=500
            )
    except Exception as e:
        print(f"Error retrieving get_blog status: {e}")
        return JSONResponse(
            {"message":f"Error retrieving get_blog status: {e}"},
            status_code=500
            )

@router.put("/update_blog/")
async def update_blog(user_data: BlogUpdate):
    try:
        update_blog = BlogModelOperations(user_email= user_data.user_email)
        if update_blog.user_details['status_code'] == 200:
            update_blog_details = update_blog.update_blog(blog_id= user_data.blog_id, 
                                                        blog_data= user_data.blog_data)
            if update_blog_details['status_code'] == 200:
                return JSONResponse({
                    "message":"Blog update successfully",
                    "blog_id": update_blog_details['blog_id'],
                    "blog_data": update_blog_details['blog_data']
                },
                status_code=200
                )
        return JSONResponse(
            content=update_blog.user_details,
            status_code=500
            )
    except Exception as e:
        print(f"Error retrieving update_blog status: {e}")
        return JSONResponse(
            {"message":f"Error retrieving update_blog status: {e}"},
            status_code=500
            )