from .health import router as health_router
from .catalogue import router as catalogue_router
from .interview import router as interview_router
from .voice import router as voice_router
from .pricing import router as pricing_router

all_routers = [
    health_router,
    catalogue_router,
    interview_router,
    voice_router,
    pricing_router,
]
