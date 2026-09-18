from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import Base, engine
from app.models.user import User
from app.routes.auth import router as auth_router
from app.routes.interaction import router as interaction_router


app = FastAPI()


@app.get("/")
def home():
    return {"message": "AuraEstate API is running"}


app.include_router(interaction_router, prefix="/api")