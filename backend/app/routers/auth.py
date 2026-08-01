from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database.session import get_db
from app.schemas.auth import UserRegister, LoginRequest, TokenResponse, RefreshTokenRequest
from app.services.auth_service import register_user, login_user, refresh_access_token
from app.dependencies.auth import get_current_user
from app.models.user import User

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

@router.post("/login", response_model=TokenResponse)
def login(
    form_data : OAuth2PasswordRequestForm = Depends(),
    db : Session = Depends(get_db)
):
    token = login_user(
        db,
        form_data.username,
        form_data.password
    )

    if not token:
        raise HTTPException(
            status_code=401,
            detail= "Invalid email and password"
        )
    return {
        "access_token" : token["access_token"],
        "refresh_token" : token["refresh_token"],
        "token_type" : "bearer"
    }

@router.get("/me")
def get_me(
    current_user : User = Depends(get_current_user)
):
    return{
        "id" : current_user.id,
        "full_name" : current_user.full_name,
        "email" : current_user.email
    }

@router.post("/refresh")
def refresh_token(
    data: RefreshTokenRequest,
    db: Session = Depends(get_db)
):

    access_token = refresh_access_token(
        db,
        data.refresh_token
    )

    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="Invalid Refresh Token"
        )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }