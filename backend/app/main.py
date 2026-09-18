from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import Base, engine
from app.models.user import User
from app.routes.auth import router as auth_router
from app.routes.interaction import router as interaction_router
from app.routes.properties import router as properties_router


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(title="AuraEstate API", version="1.0.0")


# CORS — allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "AuraEstate API is running"}


app.include_router(interaction_router, prefix="/api")
app.include_router(properties_router, prefix="/api")
app.include_router(auth_router, prefix="/api")