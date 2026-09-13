from fastapi import FastAPI

from app.routes.interaction import router as interaction_router


app = FastAPI()


@app.get("/")
def home():
    return {"message": "AuraEstate API is running"}


app.include_router(interaction_router, prefix="/api")