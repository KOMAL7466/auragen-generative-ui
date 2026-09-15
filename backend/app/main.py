from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.interaction import router as interaction_router
from app.routes.properties import router as properties_router   


app = FastAPI(title="AuraEstate API", version="1.0.0")

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