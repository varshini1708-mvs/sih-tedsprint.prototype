from fastapi import APIRouter
from ..models.interview import InterviewRequest, InterviewResponse
from ..services.interview_service import interview_service

router = APIRouter(prefix="/api", tags=["Interview"])

@router.post("/interview", response_model=InterviewResponse)
@router.post("/interview/next", response_model=InterviewResponse)
def handle_interview(request: InterviewRequest):
    return interview_service.process_interview_step(request)
