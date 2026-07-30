from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.auth import UserRegister
from app.services.auth_service import register_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED
)
def register(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):
    try:
        user = register_user(
            db=db,
            user_data=user_data
        )

        return {
            "message": "User registered successfully",
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email
            }
        }

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(error)
        )