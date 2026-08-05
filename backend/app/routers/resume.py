from fastapi import APIRouter, Depends, UploadFile, File

from sqlalchemy.orm import Session
from app.database.session import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.resume import ResumeResponse, ResumeAnalysisResponse, JobMatchRequest, JobMatchResponse
from app.services.resume_service import upload_resume, get_resume_analysis, match_resume_with_job

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

@router.get("/{resume_id}/analysis", response_model=ResumeAnalysisResponse)
def resume_analysis(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_resume_analysis(
        db,
        resume_id,
        current_user
    )

@router.post("/job-match", response_model=JobMatchResponse)
def job_match(
    data: JobMatchRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = match_resume_with_job(
        db,
        data.resume_id,
        data.job_description,
        current_user
    )
    return{
        "match_result": result
    }