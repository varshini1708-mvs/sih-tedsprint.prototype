import logging
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse

logger = logging.getLogger("tedkraft.errors")

async def global_exception_handler(request: Request, exc: Exception):
    """
    Global exception handler preventing stack traces from leaking to client.
    Logs full exception info on server.
    """
    logger.error(f"Unhandled server exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Unable to process request. Please check connection and try again."
        }
    )

async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail
        }
    )
