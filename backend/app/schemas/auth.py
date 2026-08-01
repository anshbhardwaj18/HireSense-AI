from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    full_name: str = Field(
        min_length=2,
        max_length=100
    )

    email: EmailStr

    password: str = Field(
        min_length=8,
        max_length=100
    )

class LoginRequest(BaseModel):
    email : EmailStr
    password : str

class TokenResponse(BaseModel):
    access_token : str
    token_type : str