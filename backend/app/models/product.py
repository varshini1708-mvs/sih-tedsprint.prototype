from typing import Optional, List
from pydantic import BaseModel, Field

class ProductProfile(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    material: Optional[str] = None
    craft: Optional[str] = None
    description: Optional[str] = None
    weight: Optional[str] = None
    workDays: Optional[str] = None
    price: Optional[float] = None
    priceRangeMin: Optional[float] = None
    priceRangeMax: Optional[float] = None
    keyFeatures: List[str] = Field(default_factory=list)
    suitableUses: List[str] = Field(default_factory=list)
    location: Optional[str] = None
    artisanName: Optional[str] = None
    additionalInformation: Optional[str] = None
    imageUrl: Optional[str] = None

class CatalogueItem(BaseModel):
    title: str
    category: str
    description: str
    material: str
    craft: str
    workDays: Optional[str] = None
    priceRangeMin: Optional[float] = None
    priceRangeMax: Optional[float] = None
    keyFeatures: List[str] = Field(default_factory=list)
    suitableUses: List[str] = Field(default_factory=list)

class GenerateCatalogueRequest(BaseModel):
    product: ProductProfile

class GenerateCatalogueResponse(BaseModel):
    success: bool
    catalogue: CatalogueItem
    productProfile: ProductProfile
    error: Optional[str] = None
