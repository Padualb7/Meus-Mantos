from typing import List
from sqlalchemy.orm import Session
from .models import User, Product
from .schemas import ProductResponse, UserCreate, ProductCreate, ProductUpdate
from .security import get_password_hash



def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_product(db: Session, product: ProductCreate, user_id: int):
    db_product = Product(**product.dict(), owner_id=user_id)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()

def delete_product(db: Session, product_id: int):
    db_product = get_product(db, product_id)
    db.delete(db_product)
    db.commit()
    return db_product

def update_product(db: Session, product_id: int, product: ProductUpdate):
    db_product = get_product(db, product_id)
    for key, value in product.dict(exclude_unset=True).items():
        setattr(db_product, key, value)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_user_products(db: Session, user_id: int) -> List[ProductResponse]:
    return db.query(Product).filter(Product.owner_id == user_id).all()

