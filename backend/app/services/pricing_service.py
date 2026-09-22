from ..models.pricing import FairPriceBreakdown, FairPriceResponse, FairPriceRequest
from ..models.product import ProductProfile
from ..config import settings

class PricingService:
    @staticmethod
    def calculate_fair_price(request: FairPriceRequest) -> FairPriceResponse:
        """
        Calculates fair price using deterministic Python arithmetic.
        TOTAL COST = MATERIAL COST + LABOUR COST + EXTRA CHARGES
        
        Negotiation Floor = Total Cost * (1 + margin_floor)
        Recommended Price Range = Total Cost * (1 + recommended_margin_min) to Total Cost * (1 + recommended_margin_max)
        Estimated Market Range = Total Cost * (1 + estimated_market_min) to Total Cost * (1 + estimated_market_max)
        """
        material = request.materialCost if request.materialCost is not None else 0.0
        labor = request.laborCost if request.laborCost is not None else 0.0
        extra = request.extraCharges if request.extraCharges is not None else 0.0

        # Deterministic cost sum
        total_cost = round(material + labor + extra, 2)

        # Transparent margin calculations based on backend config
        negotiation_floor = round(total_cost * (1.0 + settings.margin_floor), 2)
        recommended_min = round(total_cost * (1.0 + settings.recommended_margin_min), 2)
        recommended_max = round(total_cost * (1.0 + settings.recommended_margin_max), 2)
        estimated_market_min = round(total_cost * (1.0 + settings.estimated_market_min), 2)
        estimated_market_max = round(total_cost * (1.0 + settings.estimated_market_max), 2)

        breakdown = FairPriceBreakdown(
            materialCost=material,
            laborCost=labor,
            extraCharges=extra,
            totalCost=total_cost,
            negotiationFloor=negotiation_floor,
            recommendedMin=recommended_min,
            recommendedMax=recommended_max,
            estimatedMarketMin=estimated_market_min,
            estimatedMarketMax=estimated_market_max,
            currency="₹",
            explanation=f"Calculated deterministically: Total Cost (₹{total_cost}) + Configured Margin Policy."
        )

        return FairPriceResponse(
            success=True,
            breakdown=breakdown,
            fairPrice=recommended_min
        )

pricing_service = PricingService()
