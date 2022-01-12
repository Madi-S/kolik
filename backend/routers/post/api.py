from typing import List
from fastapi import APIRouter

from models import Post
from .utils import PostQueryHandler
from .schema import PostQuery, PostOut, PostIn

router = APIRouter(
    prefix='/post',
    tags=['post']
)


@router.get('/post/', response_model=List[PostOut], tags=['post'])
async def get_posts(data: PostQuery):
    handler = PostQueryHandler(data)
    handler.apply_all()
    posts = handler.generate_entries()
    return posts


@router.put('/post/', response_model=PostOut, tags=['post'])
async def create_post(data: PostIn):
    post = Post.create(data.dict())
    return post


@router.patch('/post/', response_model=PostOut, tags=['post'])
async def edit_post(data: PostIn):
    ...



