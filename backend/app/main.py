from fastapi import FastAPI
from sqlalchemy import text

from app.database.connection import engine
from app.database.base import Base
from app.models import User
from app.routers.auth import router as auth_router
from app.core.config import settings
from app.routers.resume import router as resume_router
from app.redis.connection import check_redis_connection
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HireSense AI API",
    description="AI-powered carrer platforom API",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(resume_router)

@app.get("/check")
def check():
    return {
        "message": "HireSense AI API",
        "algorithm": settings.ALGORITHM
    }


@app.get("/")
def root():
    return{
        "message" : "Welome to the HireSense AI App",
        "Status" : "Running"
    }

@app.get("/health")
def health_check():
    return {
        "status" : "Healthy"
    }

@app.get("/test-db")
def test_database():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))

    return {
        "database": "connected",
        "result": result.scalar()
    }

@app.get("/test-redis")
def test_redis():
    return {
        "redis" : check_redis_connection()
    }


