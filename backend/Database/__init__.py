import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.environ.get('SUPABASE_DATABASE_URL')
if not DATABASE_URL:
    raise ValueError("SUPABASE_DATABASE_URL environment variable is not set.")

try:
    # Create the engine
    engine = create_engine(DATABASE_URL)

    # Test the connection
    engine.connect()

    # Session factory
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Create a session instance
    session = SessionLocal()

except Exception as e:
    print(f"Error: Unable to connect to the database. {str(e)}")
    raise
