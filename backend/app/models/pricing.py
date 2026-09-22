from typing import Optional
from pydantic import BaseModel
from .product import ProductProfile

class FairPriceBreakdown(BaseModel):
    materialCost: float = 0.0
    laborCost: float = 0.0
    extraCharges: float = 0.0
    totalCost: float = 0.0
    negotiationFloor: float = 0.0
    recommendedMin: float = 0.0
    recommendedMax: float = 0.0
    estimatedMarketMin: float = 0.0
    estimatedMarketMax: float = 0.0
    currency: str = "₹"
    explanation: Optional[str] = None

class FairPriceRequest(BaseModel):
    productProfile: Optional[ProductProfile] = None
    materialCost: Optional[float] = None
    laborCost: Optional[float] = None
    extraCharges: Optional[float] = None

class FairPriceResponse(BaseModel):
    success: bool
    breakdown: FairPriceBreakdown
    fairPrice: float
    error: Optional[str] = None
