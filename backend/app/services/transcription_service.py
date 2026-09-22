import logging
from typing import Tuple, Dict, Any, Optional
from fastapi import UploadFile
from .gemini_service import gemini_service
from .interview_service import interview_service, sanitize_profile_dict
from ..models.product import ProductProfile

logger = logging.getLogger("tedkraft.transcription")

class TranscriptionService:
    @staticmethod
    async def transcribe_and_extract(file: UploadFile, voice_language: str = "en") -> Tuple[str, str, str, Dict[str, Any], ProductProfile]:
        """
        Processes uploaded audio file, transcribes audio to text in original language,
        detects language, normalizes extracted attributes to English, and constructs ProductProfile.
        """
        try:
            content = await file.read()
            mime_type = file.content_type or "audio/webm"

            # Use Gemini AI to transcribe audio
            text = gemini_service.transcribe_audio_file(content, mime_type, voice_language)

            if not text or not text.strip():
                return "", "en", "", {}, ProductProfile()

            # Extract & normalize product information to canonical English
            meta = interview_service.extract_multilingual_info(text, ProductProfile())
            detected_lang = meta.get("detectedLanguage", "en")
            eng_text = meta.get("englishTranslation", text)
            extracted_fields = meta.get("extractedFields", {})

            sanitized_info = sanitize_profile_dict(extracted_fields)
            extracted_profile = ProductProfile(**sanitized_info)

            return text, detected_lang, eng_text, extracted_fields, extracted_profile
        except Exception as err:
            logger.error(f"Error in transcription service: {err}")
            raise err

transcription_service = TranscriptionService()
