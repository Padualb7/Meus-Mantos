from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class ProductCreate(BaseModel):
    team: str
    year: int
    type: str
    size: str
    color: str

class ProductResponse(BaseModel):
    id: int
    team: str
    year: int
    type: str
    size: str
    color: str
    owner_id: int

    class Config:
        from_attributes = True
        
class UserLogin(BaseModel):
    username: str
    password: str

class ProductUpdate(BaseModel):
    team: Optional[str]
    year: Optional[int]
    type: Optional[str]
    size: Optional[str]
    color: Optional[str]