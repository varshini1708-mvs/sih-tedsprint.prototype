import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routes import all_routers
from .utils.error_handlers import global_exception_handler, http_exception_handler

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("tedkraft.main")

app = FastAPI(
    title="TEDKRAFT Backend",
    description="AI-Driven Market Linkage and Smart Cataloging Platform Backend",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:3004",
    "http://localhost:3002",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3004",
    "http://127.0.0.1:3002",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

if settings.frontend_url and settings.frontend_url not in origins:
    origins.append(settings.frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handlers
app.add_exception_handler(Exception, global_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)

# Include all route modules
for router in all_routers:
    app.include_router(router)

@app.get("/")
def root():
    return {
        "name": "TEDKRAFT AI Backend",
        "status": "online",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.port, reload=True)
