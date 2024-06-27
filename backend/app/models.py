from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    team = Column(String, index=True)
    year = Column(Integer)
    type = Column(String)
    size = Column(String)
    color = Column(String)
    owner_id = Column(Integer, ForeignKey('users.id'))

    owner = relationship("User")
