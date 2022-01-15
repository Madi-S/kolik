from fastapi import APIRouter, Path, HTTPException, File, UploadFile, Header
from fastapi.responses import FileResponse

from typing import List
from loguru import logger

from models import Post
from .utils import PostQueryHandler
from .schema import PostQuery, PostOut, PostIn, PostEditIn

router = APIRouter(
    prefix='/post',
    tags=['post']
)


@router.post('/query', response_model=List[PostOut], tags=['post'])
async def query_posts(data: PostQuery):
    query_handler = PostQueryHandler(data)
    query_handler.apply_all()
    posts = query_handler.generate_entries()
    return posts


@router.get('/{id}', response_model=PostOut, tags=['post'])
async def get_post_by_id(id: int = Path(...)):
    if post := Post.query.get(id):
        return post

    return HTTPException(404, 'Post not found')


@router.put('/', response_model=PostOut, tags=['post'])
async def create_post(data: PostIn):
    post = Post.create(data.dict())
    return post


@router.post('/', response_model=PostOut, tags=['post'])
async def edit_post(data: PostEditIn):
    post = Post.edit(data.dict())
    return post


IMAGES_FOLDER = 'images'


@router.put('/image', response_model=PostOut, tags=['post', 'image'])
async def upload_post_image(post_id: int = Header(None), image: UploadFile = File(...)):
    if post := Post.query.get(post_id):
        contents = await image.read()

        file_name = f'{post_id}__{image.filename}'
        file_path = f'{IMAGES_FOLDER}/{file_name}'
        
        print('Saving image to', file_path)

        with open(file_path, 'wb') as f:
            f.write(contents)

        post.set_image_uri(file_path)
        return post

    raise HTTPException(404, 'Post not found')


@router.get('/image/{post_id}', tags=['post', 'image'])
async def get_post_image(post_id: int = Path(...)):
    if post := Post.query.get(post_id):
        logger.debug('Post found {}', post.image_uri)
        if post.image_uri:
            return FileResponse(post.image_uri)

    default_image = f'{IMAGES_FOLDER}/potnyara.png'
    return FileResponse(default_image)
