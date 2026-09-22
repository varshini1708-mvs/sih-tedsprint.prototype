from ..models.product import ProductProfile, CatalogueItem, GenerateCatalogueResponse
from .gemini_service import gemini_service

class CatalogueService:
    @staticmethod
    def generate_catalogue(profile: ProductProfile) -> GenerateCatalogueResponse:
        """
        Generates/refines an artisan product catalogue using current profile information.
        Employs Gemini AI when available. Never invents fake defaults or dimensions.
        """
        system_instruction = """
You are TEDKRAFT AI, an expert artisan commerce assistant in India.
Generate a polished, professional e-commerce product catalogue item from the provided product information.
Return JSON with these fields:
- "title": clear product title
- "category": product category in uppercase (e.g. HOME DÉCOR, BAMBOO CRAFT, POTTERY, HANDLOOM)
- "description": compelling product description suitable for global buyers
- "material": main craft material
- "craft": traditional technique used
- "workDays": ONLY return work duration if explicitly provided in input JSON. If missing/empty, return empty string "".
- "keyFeatures": list of 3 key selling features
- "suitableUses": list of suitable uses/places

CRITICAL: Do NOT invent or estimate creation time/workDays if missing in input JSON. Do NOT include dimensions.
"""
        user_input = profile.model_dump_json()
        ai_result = gemini_service.generate_structured_json(system_instruction, user_input)
        if not isinstance(ai_result, dict):
            ai_result = {}

        title = ai_result.get("title") or profile.title or ""
        category = ai_result.get("category") or profile.category or ""
        description = ai_result.get("description") or profile.description or ""
        material = ai_result.get("material") or profile.material or ""
        craft = ai_result.get("craft") or profile.craft or ""
        # Strictly preserve artisan provided workDays; never overwrite with AI guess
        work_days = profile.workDays or ""
        key_features = ai_result.get("keyFeatures") or profile.keyFeatures or []
        suitable_uses = ai_result.get("suitableUses") or profile.suitableUses or []

        catalogue_item = CatalogueItem(
            title=title,
            category=category,
            description=description,
            material=material,
            craft=craft,
            workDays=work_days,
            priceRangeMin=profile.priceRangeMin,
            priceRangeMax=profile.priceRangeMax,
            keyFeatures=key_features,
            suitableUses=suitable_uses,
        )

        # Update profile with refined fields
        updated_profile = profile.model_copy(update={
            "title": title,
            "category": category,
            "description": description,
            "material": material,
            "craft": craft,
            "workDays": work_days,
            "keyFeatures": key_features,
            "suitableUses": suitable_uses,
        })

        return GenerateCatalogueResponse(
            success=True,
            catalogue=catalogue_item,
            productProfile=updated_profile
        )

catalogue_service = CatalogueService()
