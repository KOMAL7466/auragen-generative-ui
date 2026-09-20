from fastapi import FastAPI

from app.database.connection import Base, engine

from app.models.user import User
from app.models.property import Property

from app.routes.auth import router as auth_router
from app.routes.interaction import router as interaction_router
from app.routes.properties import router as properties_router


Base.metadata.create_all(bind=engine)


app = FastAPI()


@app.get("/")
def home():
    return {"message": "AuraEstate API is running"}


app.include_router(
    interaction_router,
    prefix="/api"
)

app.include_router(
    auth_router,
    prefix="/api"
)

app.include_router(
    properties_router,
    prefix="/api"
)