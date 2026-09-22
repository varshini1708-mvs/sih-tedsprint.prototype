import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    frontend_url: str = os.getenv("FRONTEND_URL", "http://localhost:5173")
    port: int = int(os.getenv("PORT", "8000"))

    # Fair Price Configurable Margin Policy Constants
    margin_floor: float = 0.10          # 10%
    recommended_margin_min: float = 0.20 # 20%
    recommended_margin_max: float = 0.40 # 40%
    estimated_market_min: float = 0.30   # 30%
    estimated_market_max: float = 0.60   # 60%

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
