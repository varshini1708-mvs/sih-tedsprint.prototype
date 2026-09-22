import logging
import re
from typing import List, Tuple, Dict, Any, Optional
from ..models.product import ProductProfile, CatalogueItem
from ..models.interview import InterviewRequest, InterviewResponse, InterviewMessage
from .gemini_service import gemini_service
from .catalogue_service import catalogue_service

logger = logging.getLogger("tedkraft.interview")

REQUIRED_FIELDS = ["title", "category", "material", "craft", "description", "workDays"]

MULTILINGUAL_QUESTIONS = {
    "en": {
        "workDays": "How long does it usually take you to make this product?",
        "description": "Could you briefly describe what makes this handcrafted item special?",
        "material": "What primary materials did you use to craft this?",
        "craft": "What traditional craft technique or method was used?",
        "category": "Which category does this product belong to (e.g., Home Décor, Bamboo Craft, Pottery)?",
        "title": "What would you like to title or name this product?",
    },
    "ta": {
        "workDays": "இந்த பொருளை செய்ய வழக்கமாக எவ்வளவு நேரம் ஆகும்?",
        "description": "இந்த கைவினைப் பொருளின் சிறப்பம்சங்களைச் சுருக்கமாகக் கூற முடியுமா?",
        "material": "இதை உருவாக்க என்ன முதன்மை பொருட்களைப் பயன்படுத்தினீர்கள்?",
        "craft": "எந்த பாரம்பரிய கைவினை நுட்பம் பயன்படுத்தப்பட்டது?",
        "category": "இந்த பொருள் எந்த வகையைச் சேர்ந்தது (எ.கா. மூங்கில் கைவினை, மண்பாண்டங்கள்)?",
        "title": "இந்த பொருளுக்கு என்ன தலைப்பு அல்லது பெயர் வைக்க விரும்புகிறீர்கள்?",
    },
    "hi": {
        "workDays": "इस उत्पाद को बनाने में आपको आमतौर पर कितना समय लगता है?",
        "description": "क्या आप संक्षेप में बता सकते हैं कि इस हस्तनिर्मित वस्तु में क्या खास है?",
        "material": "इसे बनाने के लिए आपने किन प्राथमिक सामग्रियों का उपयोग किया?",
        "craft": "किस पारंपरिक शिल्प तकनीक का उपयोग किया गया था?",
        "category": "यह उत्पाद किस श्रेणी में आता है (जैसे बांस शिल्प, मिट्टी के बर्तन)?",
        "title": "आप इस उत्पाद को क्या शीर्षक या नाम देना चाहेंगे?",
    }
}
FIELD_QUESTIONS = MULTILINGUAL_QUESTIONS["en"]

def sanitize_profile_dict(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Sanitizes dictionary values before creating or updating a ProductProfile model.
    Converts list values to comma-separated strings for string fields,
    and string values to list for list fields.
    """
    sanitized = {}
    str_fields = {"title", "category", "material", "craft", "description", "weight", "workDays", "location", "artisanName", "additionalInformation", "imageUrl"}
    list_fields = {"keyFeatures", "suitableUses"}

    for k, v in data.items():
        if v is None:
            continue
        if k in str_fields:
            if isinstance(v, list):
                sanitized[k] = ", ".join(str(item) for item in v if item)
            elif isinstance(v, (int, float)):
                sanitized[k] = str(v)
            else:
                sanitized[k] = str(v)
        elif k in list_fields:
            if isinstance(v, str):
                sanitized[k] = [v]
            elif isinstance(v, list):
                sanitized[k] = [str(item) for item in v if item]
            else:
                sanitized[k] = [str(v)]
        elif k in ("price", "priceRangeMin", "priceRangeMax"):
            try:
                sanitized[k] = float(v)
            except (ValueError, TypeError):
                pass
        else:
            sanitized[k] = v
    return sanitized

def safe_merge_profile(current: ProductProfile, incoming_dict: Dict[str, Any]) -> ProductProfile:
    """
    CRITICAL REQUIREMENT:
    Safely merges incoming dict into current ProductProfile.
    Never overwrites an existing non-empty field with None, empty string, or empty list.
    """
    merged_data = current.model_dump()
    sanitized_incoming = sanitize_profile_dict(incoming_dict)

    for key, new_val in sanitized_incoming.items():
        if key in merged_data:
            if new_val is not None and new_val != "" and new_val != []:
                merged_data[key] = new_val

    return ProductProfile(**merged_data)


class InterviewService:
    @staticmethod
    def extract_multilingual_info(text: str, current_profile: ProductProfile) -> Dict[str, Any]:
        """
        Processes multilingual text (Tamil, Hindi, English, etc.):
        1. Detects language of input ('ta', 'hi', 'en', etc.)
        2. Translates text to English ('englishTranslation')
        3. Extracts product profile details normalized to canonical ENGLISH ('extractedFields')
        """
        if not text or not text.strip():
            return {
                "detectedLanguage": "en",
                "englishTranslation": "",
                "extractedFields": {}
            }

        system_prompt = """
You are TEDKRAFT AI multilingual product information extractor and English normalizer.
Analyze the user's input text (which may be in Tamil, Hindi, English, or another language).

Perform 3 tasks:
1. Detect the language code ("en" for English, "ta" for Tamil, "hi" for Hindi, etc.) as "detectedLanguage".
2. Translate the input text accurately into English as "englishTranslation".
3. Extract product profile details EXPLICITLY stated or answered in the text, normalized into canonical ENGLISH ("extractedFields").

CRITICAL DURATION INSTRUCTIONS FOR "workDays":
- If the text explicitly states or answers a duration (such as "two days", "2 days", "3 hours", "1 week", "2 days to make", "two days to complete", or in non-English like "இரண்டு நாட்கள்", "இரண்டு நாள்", "दो दिन", "तीन दिन"), extract and normalize it as canonical English duration string in "workDays" (e.g. "2 days", "3 days", "5 hours", "1 week").
- Short duration answers like "two days", "2 days", "இரண்டு நாட்கள்", "दो दिन" ARE explicit durations for "workDays".
- If the text contains NO duration, return null for "workDays". Do NOT invent or guess missing durations.

CRITICAL FIELD NORMALIZATION RULES TO ENGLISH:
- Material names MUST be translated to English (e.g. "மூங்கில்" -> "Bamboo", "மண்" -> "Clay", "மரத்தால்" -> "Wood", "बांस" -> "Bamboo", "मिट्टी" -> "Clay").
- Craft names MUST be translated to English (e.g. "கையால் நெய்யப்பட்டது" -> "Hand Weaving", "மண்பாண்டம்" -> "Pottery", "हाथ का काम" -> "Handicraft").
- Title and Category MUST be translated to English (e.g. "மூங்கில் கூடை" -> Title: "Handmade Bamboo Basket", Category: "Bamboo Craft" or "Home Décor").

Return a JSON object with this exact structure:
{
  "detectedLanguage": "ta" | "hi" | "en",
  "englishTranslation": "...",
  "extractedFields": {
    "title": "...", // null if not explicitly stated
    "category": "...", // null if not explicitly stated
    "material": "...", // null if not explicitly stated
    "craft": "...", // null if not explicitly stated
    "description": "...", // null if not explicitly stated
    "workDays": "...", // e.g. "2 days", null if not explicitly stated
    "price": null,
    "keyFeatures": [],
    "suitableUses": []
  }
}

CRITICAL: Do NOT extract dimensions. Do NOT invent missing product information.
If a field is NOT explicitly mentioned in text, return null for that field in extractedFields.
"""
        response_json = gemini_service.generate_structured_json(system_prompt, text)

        detected_lang = response_json.get("detectedLanguage") or "en"
        eng_trans = response_json.get("englishTranslation") or text
        raw_fields = response_json.get("extractedFields") or {}
        if not isinstance(raw_fields, dict):
            raw_fields = {}

        cleaned_fields = {k: v for k, v in raw_fields.items() if v is not None and v != "" and v != []}

        # Language fallback heuristic for Indic scripts
        t_str = text.strip()
        t_lower = t_str.lower()
        if re.search(r'[\u0b80-\u0bff]', t_str):
            detected_lang = "ta"
        elif re.search(r'[\u0900-\u097f]', t_str):
            detected_lang = "hi"

        # Duration fallback heuristic
        if "workDays" not in cleaned_fields or not cleaned_fields["workDays"]:
            # Tamil duration
            m_ta = re.search(r'(இரண்டு|மூன்று|நான்கு|ஐந்து|ஆறு|ஏழு|எட்டு|ஒன்பது|பத்து|\d+)\s*(நாட்கள்|நாள்|மணிநேரம்|வாரம்)', t_str)
            if m_ta:
                num_str = m_ta.group(1)
                ta_num_map = {"இரண்டு": "2 days", "மூன்று": "3 days", "நான்கு": "4 days", "ஐந்து": "5 days", "ஆறு": "6 days", "ஏழு": "7 days"}
                cleaned_fields["workDays"] = ta_num_map.get(num_str, f"{num_str} days")
            else:
                # Hindi duration
                m_hi = re.search(r'(एक|दो|तीन|चार|पांच|छह|सात|आठ|नौ|दस|\d+)\s*(दिन|घंटे|हफ्ते|महीने)', t_str)
                if m_hi:
                    num_str = m_hi.group(1)
                    hi_num_map = {"एक": "1 day", "दो": "2 days", "तीन": "3 days", "चार": "4 days", "पांच": "5 days"}
                    cleaned_fields["workDays"] = hi_num_map.get(num_str, f"{num_str} days")
                else:
                    # English duration
                    m_en = re.search(r'(\d+|\b(one|two|three|four|five|six|seven|eight|nine|ten)\b)\s*(day|days|hour|hours|week|weeks)', t_lower)
                    if m_en:
                        num_str = m_en.group(1).lower()
                        en_num_map = {"one": "1 day", "two": "2 days", "three": "3 days", "four": "4 days", "five": "5 days"}
                        cleaned_fields["workDays"] = en_num_map.get(num_str, f"{num_str} days")

        # Material fallback heuristic to English canonical names
        if "material" not in cleaned_fields or not cleaned_fields["material"]:
            if "மூங்கில்" in t_str or "बांस" in t_str or "बाँस" in t_str or "bamboo" in t_lower:
                cleaned_fields["material"] = "Bamboo"
            elif "மண்" in t_str or "மண்பாண்டம்" in t_str or "मिट्टी" in t_str or "clay" in t_lower:
                cleaned_fields["material"] = "Clay"
            elif "மரம்" in t_str or "மரத்தால்" in t_str or "लकड़ी" in t_str or "wood" in t_lower:
                cleaned_fields["material"] = "Wood"

        # Craft fallback heuristic to English canonical names
        if "craft" not in cleaned_fields or not cleaned_fields["craft"]:
            if any(w in t_lower or w in t_str for w in ["weave", "weaving", "handwoven", "நெய்", "கையால்", "हाथ"]):
                cleaned_fields["craft"] = "Hand Weaving"
            elif any(w in t_lower or w in t_str for w in ["pottery", "wheel", "மண்பாண்டம்"]):
                cleaned_fields["craft"] = "Pottery"

        # Title & Category fallback heuristic
        if ("title" not in cleaned_fields or not cleaned_fields["title"]) and ("basket" in t_lower or "கூடை" in t_str or "टोकरी" in t_str):
            cleaned_fields["title"] = "Handmade Bamboo Basket"
            if "category" not in cleaned_fields or not cleaned_fields["category"]:
                cleaned_fields["category"] = "Bamboo Craft"
        elif ("title" not in cleaned_fields or not cleaned_fields["title"]) and ("vase" in t_lower or "pot" in t_lower or "फूलदान" in t_str or "बर्तन" in t_str):
            cleaned_fields["title"] = "Handmade Pottery Vase"
            if "category" not in cleaned_fields or not cleaned_fields["category"]:
                cleaned_fields["category"] = "Pottery"

        return {
            "detectedLanguage": detected_lang,
            "englishTranslation": eng_trans,
            "extractedFields": cleaned_fields
        }

    @staticmethod
    def extract_info_from_text(text: str, current_profile: ProductProfile) -> Dict[str, Any]:
        res = InterviewService.extract_multilingual_info(text, current_profile)
        return res["extractedFields"]

    @staticmethod
    def get_missing_required_fields(profile: ProductProfile) -> List[str]:
        """
        Determines which required fields are genuinely missing.
        """
        missing = []
        p_dict = profile.model_dump()
        for field in REQUIRED_FIELDS:
            val = p_dict.get(field)
            if val is None or val == "" or val == []:
                missing.append(field)
        return missing

    @classmethod
    def process_interview_step(cls, request: InterviewRequest) -> InterviewResponse:
        """
        Main multi-turn interview handler:
        1. Processes user answer in Tamil/Hindi/English
        2. Detects language and normalizes extracted fields to canonical English
        3. Safely merges updates into current ProductProfile (stored in English)
        4. Identifies missing required fields
        5. Determines nextQuestionLanguage from latest user answer language
        6. Generates next missing field question in nextQuestionLanguage
        """
        current_profile = request.productProfile
        user_answer = request.userAnswer
        input_lang = getattr(request, 'language', 'en') or 'en'
        asked_intents = list(getattr(request, 'askedQuestionIntents', []) or [])

        detected_lang = input_lang
        english_text = ""
        extracted_fields = {}

        if user_answer and user_answer.strip():
            res_meta = cls.extract_multilingual_info(user_answer, current_profile)
            detected_lang = res_meta["detectedLanguage"]
            english_text = res_meta["englishTranslation"]
            extracted_fields = res_meta["extractedFields"]

            current_profile = safe_merge_profile(current_profile, extracted_fields)

        missing_fields = cls.get_missing_required_fields(current_profile)
        is_complete = len(missing_fields) == 0

        next_field: Optional[str] = None
        next_question: Optional[str] = None
        assistant_message: Optional[str] = None
        catalogue_item: Optional[CatalogueItem] = None

        # PRECEDENCE FOR QUESTION LANGUAGE:
        # 1. If user's spoken/typed answer was detected in a supported non-English language ('ta', 'hi'), use detected_lang.
        # 2. If user explicitly selected voiceLanguage ('ta', 'hi', 'en'), use input_lang.
        # 3. Default to 'en'.
        if detected_lang in MULTILINGUAL_QUESTIONS and detected_lang != "en":
            next_q_lang = detected_lang
        elif input_lang in MULTILINGUAL_QUESTIONS:
            next_q_lang = input_lang
        else:
            next_q_lang = "en"

        if is_complete:
            try:
                catalogue_res = catalogue_service.generate_catalogue(current_profile)
                catalogue_item = catalogue_res.catalogue
                current_profile = catalogue_res.productProfile
            except Exception as cat_err:
                logger.warning(f"Catalogue generation error during interview completion: {cat_err}")
                catalogue_item = CatalogueItem(
                    title=current_profile.title or "Artisan Product",
                    category=current_profile.category or "HANDICRAFT",
                    description=current_profile.description or "",
                    material=current_profile.material or "",
                    craft=current_profile.craft or "",
                    workDays=current_profile.workDays or "",
                )
            assistant_message = "Thank you! All essential product information has been collected. Your catalogue is complete."
        else:
            # PREVENT REPEATED QUESTION LOOP:
            # Identify missing required fields in current_profile.
            # Avoid repeating the field asked in the immediately previous turn if other missing fields exist.
            last_asked = asked_intents[-1] if asked_intents else None
            unasked_candidates = [f for f in missing_fields if f != last_asked]

            if unasked_candidates:
                next_field = unasked_candidates[0]
            else:
                next_field = missing_fields[0]

            asked_intents.append(next_field)

            lang_dict = MULTILINGUAL_QUESTIONS.get(next_q_lang, MULTILINGUAL_QUESTIONS['en'])
            next_question = lang_dict.get(
                next_field,
                FIELD_QUESTIONS.get(next_field, f"Could you tell me more about the {next_field} of your product?")
            )
            assistant_message = next_question

        return InterviewResponse(
            success=True,
            originalText=user_answer or "",
            detectedLanguage=detected_lang,
            englishText=english_text,
            extractedFields=extracted_fields,
            assistantMessage=assistant_message,
            question=next_question,
            questionLanguage=next_q_lang,
            updatedProduct=current_profile,
            missingRequiredFields=missing_fields,
            isComplete=is_complete,
            nextField=next_field,
            nextQuestion=next_question,
            nextQuestionLanguage=next_q_lang,
            askedQuestionIntents=asked_intents,
            catalogue=catalogue_item,
        )

interview_service = InterviewService()
