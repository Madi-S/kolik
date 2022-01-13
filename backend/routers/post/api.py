from typing import List
from fastapi import APIRouter, Path, HTTPException

from models import Post
from .utils import PostQueryHandler
from .schema import PostQuery, PostOut, PostIn, PostEditIn

router = APIRouter(
    prefix='/post',
    tags=['post']
)


@router.get('/', response_model=List[PostOut], tags=['post'])
async def get_posts(data: PostQuery):
    query_handler = PostQueryHandler(data)
    query_handler.apply_all()
    posts = query_handler.generate_entries()
    return posts


@router.get('/{id}', response_model=List[PostOut], tags=['post'])
async def get_post_by_id(id: int = Path(...)):
    post = Post.query.get(id)
    if post is None:
        return HTTPException(404, 'Post not found')
    return post


@router.put('/', response_model=PostOut, tags=['post'])
async def create_post(data: PostIn):
    post = Post.create(data.dict())
    return post


@router.patch('/', response_model=PostOut, tags=['post'])
async def edit_post(data: PostEditIn):
    post = Post.edit(data.dict())
    return post
