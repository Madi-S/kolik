from typing import List
from fastapi import APIRouter

from models import Post
from .schema import PostQuery, PostOut, PostIn

router = APIRouter(
    prefix='/post',
    tags=['post']
)

@router.get('/user/', response_model=List[PostOut], tags=['post'])
async def post_query(data: PostQuery):
    # TODO: Add query logic here
    posts = Post.query.all()
    return posts

