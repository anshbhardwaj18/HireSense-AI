import os
import shutil
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.utils.pdf_parser import extract_text_from_pdf
from app.models.resume import Resume
from app.models.user import User

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

    resume = Resume(
        user_id=current_user.id,
        file_name=file.filename,
        file_path=file_path,
        extracted_text=extracted_text
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume