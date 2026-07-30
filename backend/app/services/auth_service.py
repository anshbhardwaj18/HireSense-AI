from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import UserRegister
from app.core.security import hash_password


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
        )
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user