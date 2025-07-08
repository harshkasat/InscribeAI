from Database import SessionLocal
from Database.model import Blog, User


class UserModelOperations:
    def __init__(self, user_email=None):
        self.user_email = user_email

    def check_user_exists(self):
        """
        Check if a user exists in the database.
        """
        try:
            with SessionLocal() as session:
                user = session.query(User).filter(User.email == self.user_email).first()
                if user:
                    print(f"User found with email: {user.email}")
                    return {
                        "message": f"User with email {self.user_email} already exists",
                        "email": user.email,
                        "credits": user.credits,
                        "status_code": 200
                    }
                print(f"No user found with email: {self.user_email}")
                return {
                    "message": f"No user found with email {self.user_email}",
                    "hint": "Please create a user first",
                    "status_code": 404
                }
        except Exception as e:
            print(f"Error checking user: {e}")
            return {
                "message": f"Error checking user: {e}",
                "hint": "Please create a user first",
                "status_code": 500
            }

    def create_user(self):
        """
        Create a new user in the database.
        """
        try:
            with SessionLocal() as session:
                print("New user email id ", len(self.user_email))
                new_user = User(email=self.user_email)
                session.add(new_user)
                session.commit()
                print(f"User created with email: {new_user.email}")
                return {
                    "message": "User created successfully",
                    "email": new_user.email,
                    "credits": new_user.credits,
                    "status_code": 201
                }
        except Exception as e:
            print(f"Error creating user: {e}")
            return {
                "message": f"Error creating user: {e}",
                "hint": "Please create a user first",
                "status_code": 500
            }

    def delete_user(self):
        """
        Delete a user from the database.
        """
        try:
            with SessionLocal() as session:
                session.delete(self.check_user_exists())
                session.commit()
                print(f"User deleted with email: {self.check_user_exists()['email']}")
                return {
                    "message": "User deleted successfully",
                    "email": self.check_user_exists()['email'],
                    "credits": self.check_user_exists()['credits'],
                    "status_code": 200
                }
        except Exception as e:
            print(f"Error deleting user: {e}")
            return {
                "message": f"Error deleting user: {e}",
                "email": self.user_email,
                "status_code": 500
            }

    def check_credits(self):
        """
        Check if the user has enough credits to create a blog.
        """
        try:
            if self.check_user_exists()["credits"] > 0:
                return {
                    "message": "User has enough credits to create a blog.",
                    "credits": self.check_user_exists()["credits"],
                    "status_code": 200
                }
            else:
                print("Not enough credits to create a blog.")
                return {
                    "message": "Not enough credits to create a blog.",
                    "credits": self.check_user_exists()["credits"],
                    "status_code": 400
                }
        except Exception as e:
            print(f"Error checking credits: {e}")
            return {
                "message": f"Error checking credits: {e}", 
                "credits": 0,
                "status_code": 500
            }

    def list_all_user(self):
        """
        List all users in the database.
        """
        try:
            all_user = []
            with SessionLocal() as session:
                users = session.query(User).all()

                for user in users:
                    print(f"User found with email: {user.email}")
                    details = {
                        "email": user.email,
                        "credits": user.credits,
                    }
                    all_user.append(details)
                return {
                    "message": "Users listed successfully",
                    "users": all_user,
                    "status_code": 200
                }
        except Exception as e:
            print(f"Error listing users: {e}")
            return {
                "message": f"Error when listing users: {e}",
                "users": [],
                "status_code": 500
            }

class BlogModelOperations(UserModelOperations):
    def check_list_blogs(self):
        """
        Check if a user has any blogs in the database.
        """
        try:
            # If user exists, check for blogs
            blogs_details = []
            with SessionLocal() as session:
                blogs = (
                    session.query(Blog).filter(Blog.user_email == self.user_email).all()
                )
                if len(blogs) > 0:
                    # print(
                    #     f"Blogs found for user {self.user_email}: {[blog.blog_data for blog in blogs]}"
                    # )
                    for blog in blogs:
                        # print(f"BLog date : {(blog.created_at.strftime("%Y-%m-%d"))}")
                        blogs = {
                            "blog_id": blog.blog_id,
                            "title": blog.blog_data['content'][0]['content'][0]['text'],
                            "created_at": blog.created_at.strftime("%Y-%m-%d"),
                        }
                        blogs_details.append(blogs)
                    print(blogs_details)
                    return {
                        "message": "Blogs found",
                        "blogs": blogs_details,
                        "status_code": 200
                    }
                else:
                    print("No blogs found for this user.")
                    return {
                        "message": "No blogs found for this user.", 
                        "blogs": [],
                        "status_code": 200
                        }
        except Exception as e:
            print(f"Error checking blogs: {e}")
            return {
                "message": f"Error checking blogs: {e}", 
                "blogs": [],
                "status_code": 500
            }

    def create_blog(self, blog_data):
        """
        Create a new blog in the database.
        """
        try:
            with SessionLocal() as session:
                user = session.query(User).filter(User.email == self.user_email).first()
                if not user:
                    raise Exception("User not found")

                if user.credits <= 0:
                    return {
                        "message": "Not enough credits to create a blog.",
                        "blog_id": None,
                        "status_code": 400
                    }
                user.credits -= 1
                new_blog = Blog(user_email=self.user_email, blog_data=blog_data)
                session.add(new_blog)
                session.commit()
                return {
                    "message": "Blog created successfully",
                    "blog_id": new_blog.blog_id,
                    "status_code": 201
                }
        except Exception as e:
            print(f"Error creating blog: {e}")
            return {
                "message": f"Error creating blog: {e}",
                "blog_id": None,
                "status_code": 500
            }

    def delete_blog(self, blog_id):
        """
        Delete a blog from the database.
        """
        try:
            with SessionLocal() as session:
                blog = session.query(Blog).filter(Blog.blog_id == blog_id).first()
                session.delete(blog)
                session.commit()
                return {
                    "message": "Blog deleted successfully",
                    "blog_id": blog_id,
                    "status_code": 200
                }
        except Exception as e:
            print(f"Error deleting blog: {e}")
            return {
                "message": f"Error deleting blog: {e}",
                "blog_id": blog_id,
                "status_code": 500
            }

    def get_blog(self, blog_id):
        """
        Get a blog from the database.
        """
        try:
            print(f"Getting blog with ID: {blog_id}")
            with SessionLocal() as session:
                blog = session.query(Blog).filter(Blog.blog_id == blog_id).first()
                if not blog:
                    return {
                        "message": "Blog not found",
                        "blog_data": None,
                        "status_code": 404
                    }
                return {
                        "message": "Blog found",
                        "blog_data": blog.blog_data,
                        "status_code": 200
                    }
        except Exception as e:
            print(f"Error getting blog: {e}")
            return {
                "message": f"Error getting blog: {e}",
                "blog_data": None,
                "status_code": 500
            }

    def update_blog(self, blog_id, blog_data):
        """
        Update a blog in the database.
        """
        try:
            with SessionLocal() as session:
                blog = session.query(Blog).filter(Blog.blog_id == blog_id).first()
                if not blog:
                    return {
                        "message": "Blog not found",
                        "blog_id": blog_id,
                        "status_code": 404
                    }

                blog.blog_data = blog_data
                session.commit()
                return {
                    "message": "Blog updated successfully",
                    "blog_id": blog_id,
                    "blog_data": blog.blog_data,
                    "status_code": 200
                }
        except Exception as e:
            print(f"Error updating blog: {e}")
            return {
                "message": f"Error updating blog: {e}",
                "blog_id": None,
                "status_code": 500
            }


# if __name__ == "__main__":
#     # Example usage
#     user_email = "one@one.com"

#     blog_model = BlogModelOperations(user_email=user_email)
#     blog_model.create_blog(
#         blog_data={"title": "My First Blog", "content": "This is the content of my first blog."}
#     )
#     blog_model.delete_blog(blog_id=1)
#     blogs = blog_model.check_list_blogs()
