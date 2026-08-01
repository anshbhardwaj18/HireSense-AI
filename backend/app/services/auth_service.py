from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import UserRegister
from app.core.security import hash_password, verify_password
from app.core.jwt import create_access_token, create_refresh_token, decode_refresh_token


def register_user(db: Session, user_data: UserRegister) -> User:

    existing_user = db.scalar(
        select(User).where(
            User.email == user_data.email
        )
    )

    if existing_user:
        raise ValueError("Email already registered")

    new_user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        hashed_password=hash_password(
            user_data.password
        ),
        role="candidate",
        is_active=True
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def login_user(
        db : Session,
        email : str,
        password : str
):
    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return None

    if not verify_password(
        password,
        user.hashed_password
    ):
        return None

    access_token = create_access_token(
        {
            "sub": user.email
        }
    )

    refresh_token = create_refresh_token(
        {
            "sub": user.email
        }
    )

    user.refresh_token = refresh_token

    db.commit()
    db.refresh(user)

    return {
        "access_token" : access_token,
        "refresh_token" : refresh_token
    }

def refresh_access_token(db: Session, refresh_token: str):
    payload = decode_refresh_token(refresh_token)

    if not payload:
        return None

    email = payload.get("sub")

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return None

    if user.refresh_token != refresh_token:
        return None

    new_access_token = create_access_token(
        {
            "sub" : user.email
        }
    )
    return new_access_token