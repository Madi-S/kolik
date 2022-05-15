from fastapi import Header, APIRouter, Path, HTTPException, File, UploadFile, Depends
from fastapi.responses import FileResponse

from typing import Any, List
from loguru import logger

from models import Post, User
from .utils import PostQueryHandler, generate_image_uri
from .schema import PostQuery, PostOut, PostIn, PostEditIn


# !!! Make sure that Header will be mandatory in producation build
def validate_auth_token(x_token: str = Header('2222', alias='auth-token')) -> Any:
    if x_token != '2222':
        raise HTTPException(401, 'User is not authenticated')


router = APIRouter(
    prefix='/post',
    tags=['post'],
    dependencies=[Depends(validate_auth_token)]
)


@router.post('/query', response_model=List[PostOut], tags=['post'])
async def query_posts(data: PostQuery):
    query_handler = PostQueryHandler(data)
    query_handler.apply_all()
    posts = query_handler.generate_entries()
    return posts


@router.post('/query/count', response_model=int, tags=['post'])
async def query_posts_count(data: PostQuery):
    query_handler = PostQueryHandler(data)
    query_handler.apply_all(apply_limit=False)
    posts_count = query_handler.get_count()
    return posts_count


@router.get('/{id}', response_model=PostOut, tags=['post'])
async def get_post_by_id(id: int = Path(...)):
    if post := Post.query.get(id):
        return post

    return HTTPException(404, 'Post not found')


@router.get('/by_user/{user_id}', response_model=List[PostOut], tags=['post'])
async def get_all_posts_by_user_id(user_id: int = Path(...)):
    if user := User.query.get(user_id):
        return user.posts


@router.put('/', response_model=PostOut, tags=['post'])
async def create_post(data: PostIn):
    post = Post.create(data.dict())
    return post


@router.post('/{id}', response_model=PostOut, tags=['post'])
async def edit_post(data: PostEditIn, id: int = Path(...)):
    if post := Post.query.get(id):
        # if post.user_id == data.user_id:
        post.edit(data.dict())
        return post

        # raise HTTPException(
        #     404, 'Given userId does not match with post.userId')

    raise HTTPException(404, 'Post not found')


@router.post('/activate/{id}', response_model=bool, tags=['post'])
def activate_post(id):
    '''Returns True if post was activated'''
    return Post.activate(id)


@router.post('/deactivate/{id}', response_model=bool, tags=['post'])
def deactivate_post(id):
    '''Returns True if post was deactivated'''
    return Post.deactivate(id)


IMAGES_FOLDER = 'images'


@router.put('/image/{post_id}', response_model=PostOut, tags=['post', 'image'])
async def upload_post_image(
    post_id: int = Path(...),
    image: UploadFile = File(...)
):
    if post := Post.query.get(post_id):
        contents = await image.read()

        image_uri = generate_image_uri(post_id, image.filename)
        logger.debug('Saving image to', image_uri)

        with open(image_uri, 'wb') as f:
            f.write(contents)

        post.set_image_uri(image_uri)
        return post

    raise HTTPException(404, 'Post not found')


@router.get('/image/{post_id}', tags=['post', 'image'])
async def get_post_image(post_id: int = Path(...)):
    logger.debug('Received postId', post_id)
    logger.debug('Found post with such id', Post.query.get(post_id))
    if post := Post.query.get(post_id):
        logger.debug('Post found {}', post.image_uri)
        if post.image_uri:
            return FileResponse(post.image_uri)

    default_image = f'{IMAGES_FOLDER}/potnyara.png'
    return FileResponse(default_image)
