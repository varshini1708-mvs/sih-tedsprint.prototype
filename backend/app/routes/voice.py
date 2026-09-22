import logging
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form
from ..models.voice import ProcessVoiceResponse
from ..models.product import ProductProfile
from ..services.transcription_service import transcription_service

logger = logging.getLogger("tedkraft.voice")

router = APIRouter(prefix="/api", tags=["Voice"])

@router.post("/transcribe", response_model=ProcessVoiceResponse)
@router.post("/process-voice", response_model=ProcessVoiceResponse)
async def process_voice(
    audio: UploadFile = File(...),
    language: Optional[str] = Form("en"),
    voice_language: Optional[str] = Form(None)
):
    try:
        target_lang = voice_language or language or "en"
        logger.info(f"[VOICE BACKEND DEBUG] Received file={audio.filename}, content_type={audio.content_type}, voice_language={target_lang}")
        
        text, lang, eng_text, fields, profile = await transcription_service.transcribe_and_extract(audio, target_lang)
        
        logger.info(f"[VOICE BACKEND DEBUG] Transcription result: length={len(text)}, text='{text}', lang='{lang}'")

        if not text or not text.strip():
            return ProcessVoiceResponse(
                success=False,
                originalText="",
                detectedLanguage="en",
                englishText="",
                extractedFields={},
                product=profile,
                error="No speech was detected. Please speak clearly into your microphone and try again."
            )
        return ProcessVoiceResponse(
            success=True,
            originalText=text,
            detectedLanguage=lang,
            englishText=eng_text,
            extractedFields=fields,
            product=profile
        )
    except Exception as e:
        logger.error(f"Voice route exception: {e}")
        return ProcessVoiceResponse(
            success=False,
            originalText="",
            detectedLanguage="en",
            englishText="",
            extractedFields={},
            product=ProductProfile(),
            error=str(e)
        )
