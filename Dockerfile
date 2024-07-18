# Use the official Python base image
FROM public.ecr.aws/lambda/python:3.10

# Copy the requirements file to the working directory
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# Install the Python dependencies
RUN pip install -r requirements.txt

# Copy the application code to the working directory
COPY . ${LAMBDA_TASK_ROOT}

# Expose the port on which the application will run
EXPOSE 6379
EXPOSE 8000

# Run the FastAPI application using uvicorn server
CMD ["server.handler"]