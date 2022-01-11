from typing import List
from fastapi import APIRouter

from models import Post
from .schema import PostQuery, PostOut, PostIn

router = APIRouter(
    prefix='/post',
    tags=['post']
)


@router.get('/post/', response_model=List[PostOut], tags=['post'])
async def get_posts(data: PostQuery):
    sort_by_option = PostQuery.filters.sort_by_option
    
    posts = Post.query\
        .filter_by(description=PostQuery.q)\
        .filter_by(price > PostQuery.filters.price_from)\
        .filter_by(price < PostQuery.filters.price_to)\
        .filter_by(category=PostQuery.filters.category)\
        .filter_by(location=PostQuery.filters.location)\
        .sort_by(sort_by_option)\
        .all()[PostQuery.from_:PostQuery.to + 1]

    return posts


@router.put('/post/', response_model=PostOut, tags=['post'])
async def create_post(data: PostIn):
    post = Post.create(data.dict())
    return post


@router.patch('/post/', response_model=PostOut, tags=['post'])
async def edit_post(data: PostIn):
    ...
