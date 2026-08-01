from datetime import datetime
from pydantic import BaseModel

class ResumeResponse(BaseModel):
    id: int
    file_name: str
    uploaded_at: datetime

    model_config = {
        "from_attributes" : True
    }