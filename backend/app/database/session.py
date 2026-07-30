from sqlalchemy.orm import sessionmaker, Session
from app.database.connection import engine
from collections.abc import Generator


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()