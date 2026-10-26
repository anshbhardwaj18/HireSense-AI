import os
import shutil
from uuid import uuid4

from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session

from app.utils.pdf_parser import extract_text_from_pdf
from app.models.resume import Resume
from app.models.user import User
from app.services.ai_service import analyze_resume, analyze_job_match

# Use absolute path relative to this file so it works in Docker and locally
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads", "resumes")
os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

def upload_resume(
        db: Session,
        current_user: User,
        file: UploadFile
):
    content_type = (file.content_type or "").lower()
    filename = (file.filename or "").lower()
    is_pdf = (
        content_type in ["application/pdf", "application/x-pdf", "application/acrobat", "applications/vnd.pdf", "text/pdf"]
        or filename.endswith(".pdf")
    )
    if not is_pdf:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed"
        )

    file_extension = os.path.splitext(file.filename)[1]

    unique_filename = f"{uuid4()}{file_extension}"

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)

    analysis = analyze_resume(extracted_text)

    ats_score = None
    if isinstance(analysis, dict) and "score" in analysis:
        raw_score = analysis.get("score")
        if isinstance(raw_score, (int, float)):
            ats_score = int(raw_score)
        elif isinstance(raw_score, str):
            digits = "".join(filter(str.isdigit, raw_score))
            if digits:
                ats_score = int(digits)

    resume = Resume(
        user_id=current_user.id,
        file_name=file.filename,
        file_path=file_path,
        extracted_text=extracted_text,
        ats_score=ats_score,
        analysis_result=analysis
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume

def get_resume_analysis(
        db: Session,
        resume_id: int,
        current_user: User
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id,
    ).first()

    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )

    return resume

def match_resume_with_job(
        db: Session,
        resume_id: int,
        job_description: str,
        current_user: User
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )

    result = analyze_job_match(
        resume.extracted_text,
        job_description
    )
    return result