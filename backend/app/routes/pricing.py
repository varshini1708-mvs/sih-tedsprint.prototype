from fastapi import APIRouter
from ..models.pricing import FairPriceRequest, FairPriceResponse
from ..services.pricing_service import pricing_service

router = APIRouter(prefix="/api", tags=["Pricing"])

@router.post("/fair-price", response_model=FairPriceResponse)
def calculate_fair_price(request: FairPriceRequest):
    return pricing_service.calculate_fair_price(request)
