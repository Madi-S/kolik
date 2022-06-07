from fastapi import Header, APIRouter, Path, HTTPException, File, UploadFile, Depends, Request, Response, status
from fastapi.responses import FileResponse

from typing import List
from loguru import logger

from http_ import messages
from http_.services import limiter, validate_auth_token

from models import Post, User
from config import DEFAULT_POST_IMAGE

from .utils import PostQueryHandler, generate_image_uri
from .schema import PostQuery, PostOut, PostIn, PostEditIn


router = APIRouter(
    prefix='/post',
    tags=['post'],
    dependencies=[Depends(validate_auth_token)]
)


@router.post('/query', response_model=List[PostOut], tags=['post'], status_code=status.HTTP_200_OK)
async def query_posts(
    request: Request,
    response: Response,
    data: PostQuery,
    ignore_deactivated: bool = Header(default=True)
):
    try:
        query_handler = PostQueryHandler(data, ignore_deactivated)
        query_handler.apply_all()
        posts = query_handler.generate_entries()
        return posts
    except Exception as e:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, e)


@router.post('/query/count', response_model=int, tags=['post'], status_code=status.HTTP_200_OK)
async def query_posts_count(
    request: Request,
    response: Response,
    data: PostQuery,
    ignore_deactivated: bool = Header(default=True)
):
    try:
        query_handler = PostQueryHandler(data, ignore_deactivated)
        query_handler.apply_all(apply_limit=False)
        posts_count = query_handler.get_count()
        return posts_count
    except Exception as e:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, e)


@router.get('/{id}', response_model=PostOut, tags=['post'], status_code=status.HTTP_200_OK)
async def get_post_by_id(
    request: Request,
    response: Response,
    id: str = Path(...)
):
    if post := Post.query.get(id):
        return post

    raise HTTPException(404, messages.POST_NOT_FOUND.format(id))


@router.get('/by_user/{user_id}', response_model=List[PostOut], tags=['post'], status_code=status.HTTP_200_OK)
async def get_all_posts_by_user_id(
    request: Request,
    response: Response,
    user_id: str = Path(...)
):
    if user := User.query.get(user_id):
        return user.posts

    raise HTTPException(404, messages.USER_NOT_FOUND.format(user_id))


@router.put('/', response_model=PostOut, tags=['post'], status_code=status.HTTP_201_CREATED)
@limiter.limit('3/minute')
async def create_post(
    request: Request,
    response: Response,
    data: PostIn
):
    user_id = data.user_id
    if not User.query.get(user_id):
        raise HTTPException(404, messages.USER_NOT_FOUND.format(user_id))

    post = Post.create(data.dict())
    return post


@router.delete('/{id}', tags=['post'], status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit('7/minute')
async def delete_post(
        request: Request,
        response: Response,
        id: str = Path(...)
):
    post_was_deleted = Post.delete(id)
    if not post_was_deleted:
        raise HTTPException(status.HTTP_404_NOT_FOUND, messages.POST_NOT_FOUND.format(id))


@router.post('/{id}', tags=['post'], status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit('2/minute')
async def edit_post(
        request: Request,
        response: Response,
        data: PostEditIn,
        id: str = Path(...)
):
    if post := Post.query.get(id):
        if post.user_id == data.user_id:
            post.edit(data.dict())
        else:
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED, messages.USER_NOT_AUTHORIZED)
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, messages.POST_NOT_FOUND.format(id))


@router.post('/activate/{id}', response_model=bool, tags=['post'], status_code=status.HTTP_200_OK)
@limiter.limit('4/minute')
def activate_post(
    request: Request,
    response: Response,
    id: str = Path(...)
):
    '''Returns True if post was activated'''
    if post := Post.query.get(id):
        return post.activate()

    raise HTTPException(status.HTTP_404_NOT_FOUND, messages.POST_NOT_FOUND.format(id))


@router.post('/deactivate/{id}', response_model=bool, tags=['post'], status_code=status.HTTP_200_OK)
@limiter.limit('4/minute')
def deactivate_post(
    request: Request,
    response: Response,
    id: str = Path(...)
):
    '''Returns True if post was deactivated'''
    if post := Post.query.get(id):
        return post.deactivate()

    raise HTTPException(status.HTTP_404_NOT_FOUND, messages.POST_NOT_FOUND.format(id))


@router.put('/image/{post_id}', tags=['post', 'image'], status_code=status.HTTP_204_NO_CONTENT)
async def upload_post_image(
    request: Request,
    response: Response,
    post_id: str = Path(...),
    image: UploadFile = File(...)
):
    if post := Post.query.get(post_id):
        contents = await image.read()

        image_uri = generate_image_uri(post_id, image.filename)
        logger.debug('Saving image to', image_uri)

        with open(image_uri, 'wb') as f:
            f.write(contents)

        post.set_image_uri(image_uri)
    else:
        raise HTTPException(404, messages.POST_NOT_FOUND.format(id))


@router.get('/image/{post_id}', tags=['post', 'image'], status_code=status.HTTP_200_OK)
async def get_post_image(post_id: str = Path(...)):
    logger.debug('Received postId', post_id)
    logger.debug('Found post with such id', Post.query.get(post_id))
    if post := Post.query.get(post_id):
        logger.debug('Post found {}', post.image_uri)
        if post.image_uri:
            return FileResponse(post.image_uri)
    
        default_image = DEFAULT_POST_IMAGE
        return FileResponse(default_image)
    
    raise HTTPException(status.HTTP_404_NOT_FOUND, messages.POST_NOT_FOUND.format(id))
        
