# InscribeAI: AI-Powered Blog Generator

InscribeAI is a full-stack application that generates blog content using AI.  It takes user input (blog name, target audience, desired tone, and website links) and leverages various AI models and web scraping techniques to produce a complete blog post.  The frontend is built with React and the backend uses FastAPI with Python.

## 1. Project Title and Short Description

InscribeAI: AI-Powered Blog Post Generator

InscribeAI automates blog creation by using AI to generate content based on user-specified parameters, including target audience and desired tone.  It also incorporates web scraping to enrich the generated content.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  (Add other badges as appropriate, e.g., build status, code coverage)


## 2. Project Overview

InscribeAI solves the problem of writer's block and time constraints in blog creation. It allows users to quickly generate high-quality blog posts by providing key parameters and letting the AI handle the content generation.  This is particularly useful for content marketers, bloggers, and anyone needing to produce regular blog content.  Key features include:

* AI-powered blog content generation
* Web scraping for context and information gathering
* Customizable target audience and tone
* User-friendly interface (frontend)
* Rate limiting to prevent abuse


## 3. Table of Contents

* [Project Title and Short Description](#project-title-and-short-description)
* [Project Overview](#project-overview)
* [Table of Contents](#table-of-contents)
* [Prerequisites](#prerequisites)
* [Installation Guide](#installation-guide)
* [Configuration](#configuration)
* [Usage Examples](#usage-examples)
* [Project Architecture](#project-architecture)
* [API Reference](#api-reference)
* [Contributing Guidelines](#contributing-guidelines)
* [License](#license)


## 4. Prerequisites

* **Backend:** Python 3.9+,  PostgreSQL (for database, if used), Redis (for rate limiting)
  The `requirements.txt` file lists all Python dependencies.  See section [Installation Guide](#installation-guide) for details on how to install them.
* **Frontend:** Node.js and npm (or yarn)

## 5. Installation Guide

**Backend:**

1. Clone the repository: `git clone https://github.com/harshkasat/InscribeAI.git`
2. Navigate to the backend directory: `cd InscribeAI/backend`
3. Create a virtual environment (recommended): `python3 -m venv venv`
4. Activate the virtual environment: `source venv/bin/activate` (Linux/macOS) or `venv\Scripts\activate` (Windows)
5. Install dependencies: `pip install -r requirements.txt`
6.  **(Optional) Database Setup:** Configure your PostgreSQL database and update the database connection string in the appropriate configuration file (likely a `.env` file).
7.  **(Optional) Redis Setup:** Ensure Redis is running and configure the Redis connection settings.
8. Run the application: `uvicorn app:app --reload`


**Frontend:**

1. Navigate to the frontend directory: `cd InscribeAI/frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`


## 6. Configuration

The backend uses environment variables for configuration.  Create a `.env` file in the backend directory and set the following (replace with your actual values):

* `SUPABASE_URL`: Your Supabase URL (if using Supabase for database)
* `SUPABASE_API_KEY`: Your Supabase API key (if using Supabase)
* `REDIS_URL`: Your Redis connection URL

## 7. Usage Examples

**API Endpoint:** `/create_blog/`

This endpoint accepts a POST request with the following JSON payload:

```json
{
  "blog_name": "My Awesome Blog Post",
  "add_website_link": ["https://example.com", "https://another-example.com"],
  "target_audience": "Intermediate",
  "desired_tone": "Informative"
}
```

The response will be the generated blog content (JSON structure may vary).

**Frontend Usage:** The React frontend provides a user-friendly form to input the blog parameters and display the generated content.


## 8. Project Architecture

InscribeAI follows a microservice-like architecture with a clear separation between the frontend and backend. The backend handles the AI processing, web scraping, and database interactions.  The frontend provides a user interface for input and output.  Specific details on the internal architecture of modules like `Blog.Title.title`, `Blog.HeadingOutline.outline`, etc. are not available in the provided code snippets.

## 9. API Reference

The `/create_blog/` endpoint is the primary API endpoint.  More detailed API documentation is needed.


## 10. Contributing Guidelines

(This section needs to be added based on the project's contribution guidelines)

## 11. License

(The license information is mentioned in the Project Title and Short Description section.  The full license text should be included here)


## 12-18.  (Sections 12-18 need to be added)  Testing, Deployment, Security, Ethical Considerations, Future Roadmap, Acknowledgments, Contact and Support.  These are missing from the provided code and require further information from the project.


**Code Examples (from `app.py`)**

Data Validation using Pydantic:

```python
class BlogAiRequest(BaseModel):
    blog_name: str = Field(..., title="Blog Name")
    # ... other fields

@field_validator("blog_name", "desired_tone", "target_audience")
@classmethod
def validate_blog_name(cls, value: str):
    # ... validation logic ...
    return value
```

Rate Limiting using Redis:

```python
if RateLimiter.get_instance("SlidingWindow").allow_request(ip_address):
    # ... proceed with blog generation ...
```

This README provides a foundation.  Many sections require further detail based on the full project implementation.  Remember to add thorough testing, deployment instructions, security considerations, and ethical considerations (especially crucial for an AI project) to create a complete and professional README.
