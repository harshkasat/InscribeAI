import uuid
from datetime import datetime
from sqlmodel import Field
from sqlalchemy import Column, String, Integer, DateTime, func, JSON, ForeignKey
from sqlalchemy.orm import declarative_base
from Database import engine

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(100), nullable=False, unique=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), default=func.now())
    credits: int = Column(Integer, nullable=False, default=5)

class Blog(Base):
    __tablename__ = "blogs"
    blog_id = Column(Integer, primary_key=True, autoincrement=True)
    user_email = Column(String(100), ForeignKey("users.email"), nullable=False)
    blog_data = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), default=func.now())

# Move table creation to the bottom and add a function to handle it
def init_db():
    # Drop all tables first to ensure clean slate
    Base.metadata.drop_all(engine)
    # Create all tables
    Base.metadata.create_all(engine)

if __name__ == "__main__":
    # Run this file directly to recreate tables
    init_db()
    print("Database tables created successfully!")
