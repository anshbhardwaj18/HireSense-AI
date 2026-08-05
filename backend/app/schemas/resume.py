from datetime import datetime
from pydantic import BaseModel
from typing import Any

class ResumeResponse(BaseModel):
    id: int
    file_name: str
    uploaded_at: datetime

    model_config = {
        "from_attributes" : True
    }

class ResumeAnalysisResponse(BaseModel):
    id: int
    ats_score: int | None
    analysis_result: dict[str, Any] | None

    class Config:
        from_attributes = True

class JobMatchRequest(BaseModel):
    resume_id: int
    job_description: str

class JobMatchResponse(BaseModel):
    match_result: dict[str, Any]