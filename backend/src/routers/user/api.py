from typing import List
from fastapi import APIRouter, Path

import schema
from models import *


router = APIRouter(
    prefix='/user',
    tags=['user'],
    # dependencies=[Depends(get_token_header)]
)


@router.post('/user', response_model=schema.UserOut, tags=['user'])
async def user_create(data: schema.UserIn):
    user = User.create(data.dict())
    return user


@router.get('/user/query', response_model=List[schema.UserOut], tags=['user'])
async def user_query():
    users = User.query.all()
    return users


@router.get('/user/{id}', response_model=schema.UserOut, tags=['user'])
async def user_get(id: int = Path(...)):
    user = User.query.all()[id]
    return user
