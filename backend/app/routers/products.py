from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas, security
from ..dependencies import get_db, oauth2_scheme
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import  ProductResponse, ProductUpdate
from app.database import get_db
from app.crud import get_product,  delete_product, update_product
from app.security import get_current_user
from app.models import User
router = APIRouter()

@router.post("/products/", response_model=schemas.ProductResponse)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), current_user: schemas.UserResponse = Depends(security.get_current_user)):
    return crud.create_product(db=db, product=product, user_id=current_user.id)

@router.delete("/products/{product_id}", response_model=ProductResponse)
def delete_existing_product(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_product = get_product(db, product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    if db_product.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this product")
    return delete_product(db, product_id)

@router.put("/products/{product_id}", response_model=ProductResponse)
def update_existing_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_product = get_product(db, product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    if db_product.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this product")
    return update_product(db, product_id, product)


@router.get("/products/user", response_model=List[schemas.ProductResponse])
def get_user_products(
    current_user: schemas.UserResponse = Depends(security.get_current_user),
    db: Session = Depends(get_db)
):
    products = crud.get_user_products(db=db, user_id=current_user.id)
    return products