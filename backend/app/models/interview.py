from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from .product import ProductProfile, CatalogueItem

class InterviewMessage(BaseModel):
    id: Optional[str] = None
    sender: str  # "ai" or "user"
    text: str
    timestamp: Optional[str] = None

class InterviewRequest(BaseModel):
    productProfile: ProductProfile
    conversationHistory: List[InterviewMessage] = Field(default_factory=list)
    userAnswer: Optional[str] = None
    language: Optional[str] = "en"
    askedQuestionIntents: List[str] = Field(default_factory=list)

class InterviewResponse(BaseModel):
    success: bool
    originalText: Optional[str] = None
    detectedLanguage: Optional[str] = "en"
    englishText: Optional[str] = None
    extractedFields: Dict[str, Any] = Field(default_factory=dict)
    assistantMessage: Optional[str] = None
    question: Optional[str] = None
    questionLanguage: Optional[str] = None
    updatedProduct: ProductProfile
    missingRequiredFields: List[str] = Field(default_factory=list)
    isComplete: bool
    nextField: Optional[str] = None
    nextQuestion: Optional[str] = None
    nextQuestionLanguage: Optional[str] = "en"
    askedQuestionIntents: List[str] = Field(default_factory=list)
    catalogue: Optional[CatalogueItem] = None
    error: Optional[str] = None
