from fastapi import APIRouter
from models import *

user = APIRouter(
    prefix='/user',
    tags=['user'],
    # dependencies=[Depends(get_token_header)]
)
