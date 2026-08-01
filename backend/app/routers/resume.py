from fastapi import APIRouter, Depends, UploadFile, File

from sqlalchemy.orm import Session
from app.database.session import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.resume import ResumeResponse
from app.services.resume_service import upload_resume

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

@router.post("/upload", response_model=ResumeResponse)
def upload_resume_api(file: UploadFile = File(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return upload_resume(
        db,
        current_user,
        file
    )