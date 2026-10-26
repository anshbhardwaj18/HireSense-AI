import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database.connection import engine
from app.routers.auth import router as auth_router
from app.core.config import settings
from app.routers.resume import router as resume_router
from app.redis.connection import check_redis_connection

logger = logging.getLogger(__name__)

app = FastAPI(
    title="HireSense AI API",
    description="AI-powered career platform API",
    version="1.0.0"
)

# Exception handling middleware: ensures all 500 errors produce a response that passes
# through CORSMiddleware, so that the browser always receives Access-Control-Allow-Origin
# even on internal server errors.
@app.middleware("http")
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as exc:
        logger.error(f"Unhandled exception on {request.method} {request.url.path}: {exc}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"detail": f"Internal server error: {str(exc)}"}
        )

# Origins allowed to communicate with this API
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost",
    "http://127.0.0.1",
    "http://frontend:3000",
]

if settings.ALLOWED_ORIGINS:
    extra_origins = [o.strip() for o in settings.ALLOWED_ORIGINS.split(",") if o.strip()]
    origins.extend(extra_origins)

# Outermost middleware: handles CORS preflight and response headers for all requests,
# including responses produced by catch_exceptions_middleware.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
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
    return {
        "message": "Welcome to the HireSense AI App",
        "status": "Running"
    }


@app.get("/health")
def health_check():
    db_ok = False
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            db_ok = True
    except Exception:
        db_ok = False

    redis_ok = check_redis_connection()

    return {
        "status": "Healthy" if (db_ok and redis_ok) else "Degraded",
        "database": "connected" if db_ok else "disconnected",
        "redis": "connected" if redis_ok else "disconnected"
    }


@app.get("/test-db")
def test_database():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            return {
                "database": "connected",
                "result": result.scalar()
            }
    except Exception as e:
        return {
            "database": "disconnected",
            "error": str(e)
        }


@app.get("/test-redis")
def test_redis():
    return {
        "redis": check_redis_connection()
    }