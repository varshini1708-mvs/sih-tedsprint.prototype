from fastapi import APIRouter
from ..models.product import GenerateCatalogueRequest, GenerateCatalogueResponse
from ..services.catalogue_service import catalogue_service

router = APIRouter(prefix="/api", tags=["Catalogue"])

@router.post("/generate-catalogue", response_model=GenerateCatalogueResponse)
@router.post("/catalogue/generate", response_model=GenerateCatalogueResponse)
def generate_catalogue(request: GenerateCatalogueRequest):
    return catalogue_service.generate_catalogue(request.product)
