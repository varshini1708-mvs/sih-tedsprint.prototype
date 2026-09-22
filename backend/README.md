# TEDKRAFT FastAPI Backend

Production-ready Python FastAPI backend for **TEDKRAFT** — AI-Driven Market Linkage and Smart Cataloging Platform for Marginalized Artisans.

---

## Technical Features

- **Framework**: FastAPI (Python 3.11+)
- **Server**: Uvicorn
- **Data Validation**: Pydantic v2
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash)
- **Audio Processing**: Multimodal Gemini audio transcription
- **Fair Price Engine**: Deterministic Python arithmetic (`Material + Labor + Packaging + Transport + Fees`)
- **Interview Engine**: Multi-turn data collection with safe profile merging and duplicate-question prevention
- **Testing**: Pytest & FastAPI TestClient

---

## Project Structure

```
backend/
├── app/
│   ├── main.py                   # FastAPI app entrypoint & CORS config
│   ├── config.py                 # Pydantic BaseSettings config
│   ├── models/                   # Pydantic schemas (Product, Interview, Voice, Pricing)
│   ├── routes/                   # API route handlers (health, catalogue, interview, voice, pricing)
│   ├── services/                 # Core business & AI logic
│   └── utils/                    # Exception handlers & loggers
├── tests/                        # Pytest suite
├── requirements.txt              # Dependencies
├── .env.example                  # Environment configuration template
└── README.md
```

---

## Local Setup & Development

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
```

Activate virtual environment:
- **Windows**: `venv\Scripts\activate`
- **Linux/macOS**: `source venv/bin/activate`

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set environment variables in `.env`:
```env
GEMINI_API_KEY=your_real_gemini_api_key
FRONTEND_URL=http://localhost:5173
PORT=8000
```

### 4. Start Local Development Server

```bash
uvicorn app.main:app --reload --port 8000
```

Access Swagger UI interactive docs at:
`http://localhost:8000/docs`

---

## API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health check |
| `POST` | `/api/generate-catalogue` | Generate AI catalogue from profile |
| `POST` | `/api/interview/next` | Multi-turn AI interview step & safe merge |
| `POST` | `/api/process-voice` | Transcribe audio blob & extract product data |
| `POST` | `/api/fair-price` | Deterministic fair price breakdown calculation |

---

## Render Deployment Instructions

1. Connect repository to **Render** as a **Web Service**.
2. Set Environment: **Python 3**.
3. **Build Command**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Start Command**:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
5. Add Environment Variables in Render Dashboard:
   - `GEMINI_API_KEY` = `your_google_gemini_api_key`
   - `FRONTEND_URL` = `https://your-app.netlify.app`

---

## Running Automated Unit Tests

```bash
pytest
```
