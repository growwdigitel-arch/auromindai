from fastapi import APIRouter, HTTPException, status
from app.schemas.schemas import UserCreate, UserOut, Token
import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/signup", response_model=UserOut)
async def signup(user_in: UserCreate):
    return UserOut(
        id="usr_101",
        email=user_in.email,
        full_name=user_in.full_name,
        is_active=True,
        mfa_enabled=False,
        created_at=datetime.datetime.utcnow()
    )

@router.post("/login", response_model=Token)
async def login(user_in: UserCreate):
    return Token(access_token="auromind_jwt_token_sample_access", token_type="bearer")
