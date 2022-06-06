from fastapi import APIRouter, HTTPException, status

from loguru import logger
from models import Feedback, User

from .schema import FeedbackIn, FeedbackOut


router = APIRouter(
    prefix='/misc',
    tags=['misc']
)


@router.put('/feedback', response_model=FeedbackOut, tags=['misc'], status_code=status.HTTP_201_CREATED)
def create_feedback(data: FeedbackIn):
    user_id = data.user_id
    if User.query.get(user_id):
        feedback = Feedback.create(data.dict())
        return feedback

    raise HTTPException(status.HTTP_404_NOT_FOUND,
                        f'User with id {user_id} does not exist')
