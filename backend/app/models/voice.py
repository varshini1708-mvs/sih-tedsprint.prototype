from typing import Optional, Dict, Any
from pydantic import BaseModel, Field
from .product import ProductProfile

class ProcessVoiceResponse(BaseModel):
    success: bool
    originalText: Optional[str] = None
    detectedLanguage: Optional[str] = "en"
    englishText: Optional[str] = None
    extractedFields: Dict[str, Any] = Field(default_factory=dict)
    product: Optional[ProductProfile] = None
    error: Optional[str] = None
