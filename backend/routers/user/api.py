from fastapi import APIRouter, Path, HTTPException, Request, Response

from typing import List
from loguru import logger

from main import limiter
from models import User, Phone
from .utils import PhoneEntity
from config import TEST_CONFIRMATION_CODE
from .schema import UserOut, UserIn, UserEditIn


router = APIRouter(
    prefix='/user',
    tags=['user']
)


registration_steps = '''
Registration steps:
1) Create Phone object (ignore if exists) and set confirmation code, which is sent to the user.
2) Create User object by providing name, phone and location, if provided confirmation code is correct.
'''


@router.get('/', response_model=List[UserOut], tags=['user'])
async def get_users(request: Request, response: Response):
    users = User.query.all()
    return users


@router.get('/{id}', response_model=UserOut, tags=['user'])
async def get_user_by_id(
    request: Request,
    response: Response,
    id: int = Path(...)
):
    user = User.query.get(id)
    if user is None:
        return HTTPException(404, 'User not found')
    return user


@limiter.limit('2/minute')
@router.post('/{id}', response_model=UserOut, tags=['user'])
async def edit_user(
    request: Request,
    response: Response,
    data: UserEditIn,
    id: int = Path(...)
):
    if user := User.query.get(id):
        user.edit(data.dict())
        return user

    raise HTTPException(404, 'User not found')


@limiter.limit('3/minute')
@router.post(
    '/send-code/{phone}',
    tags=['user', 'phone'],
    description=registration_steps
)
async def send_confirmation_code(
    request: Request,
    response: Response,
    phone: str = Path(...)
):
    phone_entity = PhoneEntity(phone)
    if phone_entity.is_valid():
        # TODO: Later randomly generate 4-digit code and send it as SMS
        code = TEST_CONFIRMATION_CODE
        if phone_entity.confirmation_code_sent(code):
            phone_obj = Phone.query.filter_by(value=phone).first() or \
                Phone.create(phone)
            phone_obj.set_confirmation_code_to(code)

            return {'msg': f'Confirmation code sent to {phone}', 'status': True}

        return {'msg': f'Confirmation was not code sent to {phone}', 'status': False}

    return {'msg': f'Phone {phone} is not valid', 'status': False}


@limiter.limit('3/minute')
@router.put(
    '/{confirmation_code}',
    response_model=UserOut,
    tags=['user', 'phone'],
    description=registration_steps
)
async def create_user(
    request: Request,
    response: Response,
    data: UserIn,
    confirmation_code: str = Path(...)
):
    if phone_obj := Phone.query.filter_by(value=data.phone).first():
        if phone_obj.confirmed(confirmation_code):
            logger.debug('Phone confirmed successfully')

            phone_obj.set_confirmation_code_to(None)

            user = User.query.filter_by(phone=data.phone).first() or \
                User.create(data.dict())
            return user
        else:
            raise HTTPException(404, 'Confirmation code is incorrect')
    raise HTTPException(404,
                        'Phone was not found, try sending a confirmation code to it first')
