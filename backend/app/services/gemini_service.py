import json
import time
import logging
from google import genai
from google.genai import types
from ..config import settings

logger = logging.getLogger("tedkraft.gemini")

class GeminiService:
    def __init__(self):
        self.api_key = settings.gemini_api_key
        self.client = None
        if self.api_key and self.api_key != "mock_key_for_local_dev":
            try:
                self.client = genai.Client(api_key=self.api_key)
                logger.info("Google GenAI client initialized successfully.")
            except Exception as e:
                logger.error(f"Failed to initialize Google GenAI client: {e}")

    def generate_structured_json(self, system_instruction: str, user_content: str) -> dict:
        """
        Sends a prompt to Gemini using the google.genai SDK and parses structured JSON output.
        Includes automatic fallback across available model names in case of 503/404/429 errors.
        """
        if not self.client:
            logger.warning("Gemini AI client not initialized (no API key or invalid environment). Returning empty dict.")
            return {}

        prompt = f"""
{system_instruction}

Respond ONLY with valid JSON. Do not include markdown code block backticks.

Input:
{user_content}
"""
        models_to_try = ["gemini-3.1-flash-lite", "gemini-3.6-flash", "gemini-flash-lite-latest", "gemini-3.5-flash"]
        last_error = None

        for model_name in models_to_try:
            for attempt in range(2):
                try:
                    response = self.client.models.generate_content(
                        model=model_name,
                        contents=prompt
                    )
                    raw_text = response.text.strip() if response.text else ""
                    
                    # Clean possible markdown wrapping ```json ... ```
                    if raw_text.startswith("```"):
                        lines = raw_text.splitlines()
                        if lines[0].startswith("```"):
                            lines = lines[1:]
                        if lines and lines[-1].startswith("```"):
                            lines = lines[:-1]
                        raw_text = "\n".join(lines).strip()

                    return json.loads(raw_text)
                except json.JSONDecodeError as err:
                    logger.error(f"Gemini returned invalid JSON using {model_name}: {err}")
                    return {}
                except Exception as err:
                    err_msg = str(err)
                    logger.warning(f"Gemini API model {model_name} attempt {attempt+1} failed: {err_msg[:120]}")
                    last_error = err
                    if ("429" in err_msg or "RESOURCE_EXHAUSTED" in err_msg) and attempt == 0:
                        time.sleep(1)
                        continue
                    break

        logger.error(f"All Gemini models failed. Last error: {last_error}")
        return {}

    def transcribe_audio_file(self, file_bytes: bytes, mime_type: str = "audio/webm", voice_language: str = "en") -> str:
        """
        Transcribes audio using Gemini multimodal input via google.genai SDK.
        Includes automatic fallback across available model names and lite quota pools.
        """
        if not self.client:
            logger.warning("Gemini AI client not initialized for audio transcription.")
            return ""

        # Clean mime_type parameter (e.g. "audio/webm;codecs=opus" -> "audio/webm")
        clean_mime = mime_type.split(";")[0].strip() if mime_type else "audio/webm"
        if not clean_mime or clean_mime == "application/octet-stream":
            clean_mime = "audio/webm"

        # Determine target language instruction hint
        lang_lower = (voice_language or "en").lower()
        if lang_lower.startswith("ta"):
            lang_prompt = "The speaker is speaking in Tamil. Accurately transcribe the spoken words into verbatim Tamil script (e.g., தமிழ் script). Do NOT translate into English."
        elif lang_lower.startswith("hi"):
            lang_prompt = "The speaker is speaking in Hindi. Accurately transcribe the spoken words into verbatim Devanagari script (e.g., हिन्दी script). Do NOT translate into English."
        elif lang_lower.startswith("en"):
            lang_prompt = "The speaker is speaking in English. Accurately transcribe the spoken words into verbatim English text."
        else:
            lang_prompt = f"The speaker is speaking in {voice_language}. Accurately transcribe the spoken words into verbatim native script of that language. Do NOT translate into English."

        transcription_instruction = (
            f"Please accurately transcribe the spoken words in this audio file.\n"
            f"{lang_prompt}\n"
            "Return ONLY the verbatim spoken transcript text with no extra commentary, code blocks, or translation."
        )

        models_to_try = ["gemini-3.1-flash-lite", "gemini-3.6-flash", "gemini-flash-lite-latest", "gemini-3.5-flash"]
        last_error = None

        for model_name in models_to_try:
            for attempt in range(2):
                try:
                    logger.info(f"Sending {len(file_bytes)} bytes audio ({clean_mime}, target_lang={voice_language}) to {model_name} (attempt {attempt+1})...")
                    audio_part = types.Part.from_bytes(data=file_bytes, mime_type=clean_mime)
                    response = self.client.models.generate_content(
                        model=model_name,
                        contents=[
                            transcription_instruction,
                            audio_part
                        ]
                    )
                    transcript = response.text.strip() if response.text else ""
                    if transcript:
                        logger.info(f"Gemini ({model_name}) transcription output: '{transcript}'")
                        return transcript
                except Exception as e:
                    err_msg = str(e)
                    logger.warning(f"Gemini audio transcription model {model_name} attempt {attempt+1} error: {err_msg[:120]}")
                    last_error = e
                    if ("429" in err_msg or "RESOURCE_EXHAUSTED" in err_msg) and attempt == 0:
                        time.sleep(1)
                        continue
                    break

        logger.error(f"All Gemini audio transcription models failed. Last error: {last_error}")
        return ""

gemini_service = GeminiService()
