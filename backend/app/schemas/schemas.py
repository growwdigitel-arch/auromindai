from pydantic import BaseModel, EmailStr
from typing import Optional, List
import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: str
    is_active: bool
    mfa_enabled: bool
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Chat Schemas
class MessageCreate(BaseModel):
    content: str
    model: Optional[str] = "AuroVex 1.5"
    mode: Optional[str] = "General AI"
    web_search: bool = True
    deep_think: bool = False

class ChatOut(BaseModel):
    id: str
    title: str
    pinned: bool
    model: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# Agent Schemas
class AgentCreate(BaseModel):
    name: str
    description: str
    category: str
    system_prompt: str
    tools: List[str] = []

class AgentOut(AgentCreate):
    id: str
    status: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# RAG Knowledge Schemas
class KnowledgeOut(BaseModel):
    id: str
    file_name: str
    file_type: str
    file_size: str
    status: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True
