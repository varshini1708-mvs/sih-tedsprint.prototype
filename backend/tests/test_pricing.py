from app.services.pricing_service import pricing_service
from app.models.pricing import FairPriceRequest

def test_deterministic_fair_price_calculation(client):
    payload = {
        "materialCost": 200.0,
        "laborCost": 300.0,
        "extraCharges": 50.0
    }
    response = client.post("/api/fair-price", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    
    # Material (200) + Labour (300) + Extra (50) = Total Cost (550)
    # Floor: 550 * 1.10 = 605.0
    # Recommended Range: 660.0 to 770.0
    # Estimated Market Range: 715.0 to 880.0
    bd = data["breakdown"]
    assert bd["totalCost"] == 550.0
    assert bd["negotiationFloor"] == 605.0
    assert bd["recommendedMin"] == 660.0
    assert bd["recommendedMax"] == 770.0
    assert bd["estimatedMarketMin"] == 715.0
    assert bd["estimatedMarketMax"] == 880.0

def test_pricing_service_directly():
    req = FairPriceRequest(materialCost=200.0, laborCost=300.0, extraCharges=50.0)
    res = pricing_service.calculate_fair_price(req)
    assert res.breakdown.totalCost == 550.0
    assert res.breakdown.negotiationFloor == 605.0
    assert res.breakdown.recommendedMin == 660.0
    assert res.breakdown.recommendedMax == 770.0
