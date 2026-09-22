from app.models.product import ProductProfile
from app.services.interview_service import safe_merge_profile, interview_service
from app.models.interview import InterviewRequest

def test_safe_profile_merging():
    initial = ProductProfile(
        title="Bamboo Basket",
        material="Bamboo",
        craft="Handwoven"
    )
    delta = {
        "workDays": "3 Days",
        "material": "",
        "title": None
    }
    merged = safe_merge_profile(initial, delta)
    assert merged.title == "Bamboo Basket"
    assert merged.material == "Bamboo"
    assert merged.craft == "Handwoven"
    assert merged.workDays == "3 Days"

def test_missing_fields_and_interview_completion():
    incomplete = ProductProfile(
        title="Bamboo Basket",
        material="Bamboo"
    )
    missing = interview_service.get_missing_required_fields(incomplete)
    assert "category" in missing
    assert "craft" in missing
    assert "description" in missing
    assert "workDays" in missing
    assert "material" not in missing

def test_complete_profile_interview_completion(client):
    complete_profile = {
        "productProfile": {
            "title": "Handwoven Bamboo Basket",
            "category": "HOME DÉCOR",
            "material": "Bamboo",
            "craft": "Hand Weaving",
            "description": "Handcrafted basket made of bamboo.",
            "workDays": "2 Days"
        }
    }
    response = client.post("/api/interview/next", json=complete_profile)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["isComplete"] is True
    assert data["nextQuestion"] is None
    assert data["catalogue"] is not None

def test_multilingual_test_1_tamil_material(client):
    # TEST 1 — Tamil material
    # Input: "இது மூங்கில் கூடை."
    # Expected: detectedLanguage = "ta", material = "Bamboo", workDays empty
    req = {
        "productProfile": {
            "title": "",
            "category": "",
            "material": "",
            "craft": "",
            "description": "",
            "workDays": ""
        },
        "userAnswer": "இது மூங்கில் கூடை."
    }
    res = client.post("/api/interview/next", json=req)
    assert res.status_code == 200
    data = res.json()
    assert data["detectedLanguage"] == "ta"
    assert data["updatedProduct"]["material"] == "Bamboo"
    assert not data["updatedProduct"].get("workDays")

def test_multilingual_test_2_tamil_timing(client):
    # TEST 2 — Tamil timing
    # Input: "இதை செய்ய இரண்டு நாட்கள் ஆகும்."
    # Expected: detectedLanguage = "ta", workDays = "2 days"
    req = {
        "productProfile": {
            "title": "Bamboo Basket",
            "category": "Home Décor",
            "material": "Bamboo",
            "craft": "Hand Weaving",
            "description": "Artisan bamboo basket",
            "workDays": ""
        },
        "userAnswer": "இதை செய்ய இரண்டு நாட்கள் ஆகும்."
    }
    res = client.post("/api/interview/next", json=req)
    assert res.status_code == 200
    data = res.json()
    assert data["detectedLanguage"] == "ta"
    assert data["updatedProduct"]["workDays"] == "2 days"

def test_multilingual_test_3_tamil_multiple_fields(client):
    # TEST 3 — Tamil multiple fields
    # Input: "இது மூங்கில் கூடை, இதை செய்ய இரண்டு நாட்கள் ஆகும்."
    # Expected: material = "Bamboo", workDays = "2 days", no repeated questions for those fields
    req = {
        "productProfile": {
            "title": "",
            "category": "",
            "material": "",
            "craft": "",
            "description": "",
            "workDays": ""
        },
        "userAnswer": "இது மூங்கில் கூடை, இதை செய்ய இரண்டு நாட்கள் ஆகும்."
    }
    res = client.post("/api/interview/next", json=req)
    assert res.status_code == 200
    data = res.json()
    assert data["updatedProduct"]["material"] == "Bamboo"
    assert data["updatedProduct"]["workDays"] == "2 days"
    assert "material" not in data["missingRequiredFields"]
    assert "workDays" not in data["missingRequiredFields"]

def test_multilingual_test_4_hindi(client):
    # TEST 4 — Hindi
    # Input: "यह बाँस की टोकरी है और इसे बनाने में तीन दिन लगते हैं।"
    # Expected: detectedLanguage = "hi", material = "Bamboo", workDays = "3 days"
    req = {
        "productProfile": {
            "title": "",
            "category": "",
            "material": "",
            "craft": "",
            "description": "",
            "workDays": ""
        },
        "userAnswer": "यह बाँस की टोकरी है और इसे बनाने में तीन दिन लगते हैं।"
    }
    res = client.post("/api/interview/next", json=req)
    assert res.status_code == 200
    data = res.json()
    assert data["detectedLanguage"] == "hi"
    assert data["updatedProduct"]["material"] == "Bamboo"
    assert data["updatedProduct"]["workDays"] == "3 days"

def test_multilingual_test_5_english(client):
    # TEST 5 — English
    # Input: "This is a bamboo basket and it takes four days to make."
    # Expected: detectedLanguage = "en", material = "Bamboo", workDays = "4 days"
    req = {
        "productProfile": {
            "title": "",
            "category": "",
            "material": "",
            "craft": "",
            "description": "",
            "workDays": ""
        },
        "userAnswer": "This is a bamboo basket and it takes four days to make."
    }
    res = client.post("/api/interview/next", json=req)
    assert res.status_code == 200
    data = res.json()
    assert data["detectedLanguage"] == "en"
    assert data["updatedProduct"]["material"] == "Bamboo"
    assert data["updatedProduct"]["workDays"] == "4 days"

def test_multilingual_test_6_missing_timing(client):
    # TEST 6 — Missing timing
    # Input: "இது மூங்கில் கூடை."
    # Expected: material = "Bamboo", workDays = empty, AI asks timing question in Tamil
    req = {
        "productProfile": {
            "title": "Bamboo Basket",
            "category": "Home Décor",
            "material": "",
            "craft": "Weaving",
            "description": "Tamil handicraft",
            "workDays": ""
        },
        "userAnswer": "இது மூங்கில் கூடை."
    }
    res = client.post("/api/interview/next", json=req)
    assert res.status_code == 200
    data = res.json()
    assert data["updatedProduct"]["material"] == "Bamboo"
    assert not data["updatedProduct"].get("workDays")
    assert "workDays" in data["missingRequiredFields"]
    assert data["nextQuestionLanguage"] == "ta"
    assert "எவ்வளவு நேரம் ஆகும்" in data["nextQuestion"]

def test_multilingual_test_7_language_switching(client):
    # TEST 7 — Language switching
    # Answer 1 in Tamil -> detectedLanguage = "ta", next question in Tamil
    profile = {
        "title": "Crafted Bowl",
        "category": "Pottery",
        "material": "",
        "craft": "",
        "description": "Traditional item",
        "workDays": ""
    }
    
    # Step 1: Tamil answer
    res1 = client.post("/api/interview/next", json={
        "productProfile": profile,
        "userAnswer": "இது மண்பாண்டம்." # Clay pottery
    })
    data1 = res1.json()
    assert data1["detectedLanguage"] == "ta"
    assert data1["updatedProduct"]["material"] == "Clay"
    assert data1["nextQuestionLanguage"] == "ta"

    # Step 2: Switch to Hindi answer
    res2 = client.post("/api/interview/next", json={
        "productProfile": data1["updatedProduct"],
        "userAnswer": "इसे बनाने में तीन दिन लगते हैं।" # 3 days in Hindi
    })
    data2 = res2.json()
    assert data2["detectedLanguage"] == "hi"
    assert data2["updatedProduct"]["material"] == "Clay" # Preserved!
    assert data2["updatedProduct"]["workDays"] == "3 days"
    assert data2["nextQuestionLanguage"] == "hi"

def test_multilingual_test_8_no_hallucination(client):
    # TEST 8 — No hallucination
    # Input: "இது மூங்கில் கூடை."
    # Expected: workDays remains empty. No guessed timing.
    req = {
        "productProfile": {
            "title": "Bamboo Basket",
            "category": "Home Décor",
            "material": "",
            "craft": "Hand Weaving",
            "description": "Eco basket",
            "workDays": ""
        },
        "userAnswer": "இது மூங்கில் கூடை."
    }
    res = client.post("/api/interview/next", json=req)
    assert res.status_code == 200
    data = res.json()
    assert not data["updatedProduct"].get("workDays")

def test_multilingual_test_9_fresh_product_isolation(client):
    # TEST 9 — Fresh product isolation
    # Product A: workDays = "two days"
    prod_a_req = {
        "productProfile": {
            "title": "Handmade Bamboo Basket",
            "category": "Home Décor",
            "material": "Bamboo",
            "craft": "Weaving",
            "description": "Eco basket",
            "workDays": ""
        },
        "userAnswer": "two days"
    }
    res_a = client.post("/api/interview/next", json=prod_a_req)
    data_a = res_a.json()
    assert data_a["updatedProduct"]["workDays"] in ("2 days", "two days")

    # Start Product B fresh
    prod_b_req = {
        "productProfile": {
            "title": "Handmade Pottery Vase",
            "category": "Pottery",
            "material": "Clay",
            "craft": "Pottery",
            "description": "Ceramic vase",
            "workDays": ""
        },
        "userAnswer": "மூன்று நாட்கள் ஆகும்." # Tamil 3 days
    }
    res_b = client.post("/api/interview/next", json=prod_b_req)
    data_b = res_b.json()
    assert data_b["updatedProduct"]["workDays"] == "3 days"
    # Product A remains separate
    assert data_a["updatedProduct"]["workDays"] in ("2 days", "two days")
