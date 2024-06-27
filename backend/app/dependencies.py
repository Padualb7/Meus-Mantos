from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base
from fastapi.security import OAuth2PasswordBearer

DATABASE_URL = "sqlite:///./autentication.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)
