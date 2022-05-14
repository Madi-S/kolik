from fastapi import APIRouter

from loguru import logger
from models import Feedback

from .schema import FeedbackIn, FeedbackOut


router = APIRouter(
    prefix='/misc',
    tags=['misc'],
)


@router.put('/feedback', response_model=FeedbackOut, tags=['misc'])
def create_feedback(data: FeedbackIn):
    print('Incoming feedback body', data)
    feedback = Feedback.create(data.dict())
    return feedback
