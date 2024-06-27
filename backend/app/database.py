from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship

# Defina o URL do banco de dados (SQLite, neste caso)
DATABASE_URL = "sqlite:///./database.db"

# Crie o motor de banco de dados
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Crie uma classe base declarativa
Base = declarative_base()

# Crie a fábrica de sessões
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Defina o modelo de usuário
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    team = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    type = Column(String, nullable=False)
    size = Column(String, nullable=False)
    color = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="products")
# Crie todas as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Defina a função get_db
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
