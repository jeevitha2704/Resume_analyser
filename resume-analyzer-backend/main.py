from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db, engine
from app.models import Base
from app.api import auth, resume, job_match

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG
)

# CORS middleware - More permissive setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,  # Changed to False
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(resume.router, prefix="/api/resume", tags=["resume"])
app.include_router(job_match.router, prefix="/api/job", tags=["job matching"])

@app.get("/")
async def root():
    return {"message": "AI Resume Analyzer API", "version": "1.0.0"}

@app.options("/{path:path}")
async def options_handler(path: str):
    return {"status": "ok"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": settings.APP_NAME}
