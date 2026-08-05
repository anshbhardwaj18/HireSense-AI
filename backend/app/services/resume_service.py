import os
import shutil
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.utils.pdf_parser import extract_text_from_pdf
from app.models.resume import Resume
from app.models.user import User
from app.services.ai_service import analyze_resume, analyze_job_match

UPLOAD_DIR = "uploads/resumes"
os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

def upload_resume(
        db: Session,
        current_user: User,
        file: UploadFile
):
    if file.content_type != "application/pdf":
        raise ValueError("Only pdf files are allowed")
    
    file_extension = os.path.splitext(file.filename)[1]

    unique_filename = f"{uuid4()}{file_extension}"

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(
    file_path)

    analysis = analyze_resume(extracted_text)
    print(analysis)

    resume = Resume(
        user_id=current_user.id,
        file_name=file.filename,
        file_path=file_path,
        extracted_text=extracted_text,
        ats_score=analysis.get("score"),
        analysis_result=analysis
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume

def get_resume_analysis(
        db: Session,
        resume_id : int,
        current_user : User
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id,
    ).first()

    if not resume:
        raise ValueError("Resume not found")

    return resume

def match_resume_with_job(
        db: Session,
        resume_id: int,
        job_descripiton: str,
        current_user: User
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise ValueError("Resume not found")

    result = analyze_job_match(
        resume.extracted_text,
        job_descripiton
    )
    return result