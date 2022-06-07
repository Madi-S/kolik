from fastapi import APIRouter, Path, HTTPException, Request, Response, status

from typing import List
from loguru import logger

from http_ import messages
from http_.services import limiter

from models import User, Phone
from config import TEST_CONFIRMATION_CODE

from .utils import PhoneEntity
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


@router.get('/', response_model=List[UserOut], tags=['user'], status_code=status.HTTP_200_OK)
@limiter.limit('2/minute')
async def get_users(request: Request, response: Response):
    users = User.query.all()
    return users


@router.get('/{id}', response_model=UserOut, tags=['user'], status_code=status.HTTP_200_OK)
async def get_user_by_id(
    request: Request,
    response: Response,
    id: str = Path(...)
):
    if user := User.query.get(id):
        return user

    raise HTTPException(status.HTTP_404_NOT_FOUND,
                        messages.USER_NOT_FOUND.format(id))


@router.post('/{id}', tags=['user'], status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit('2/minute')
async def edit_user(
    request: Request,
    response: Response,
    data: UserEditIn,
    id: str = Path(...)
):
    if user := User.query.get(id):
        user.edit(data.dict())
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            messages.USER_NOT_FOUND.format(id))


@router.post(
    '/send-code/{phone}',
    tags=['user', 'phone'],
    description=registration_steps,
    status_code=status.HTTP_200_OK
)
@limiter.limit('3/minute')
async def send_confirmation_code(
    request: Request,
    response: Response,
    phone: str = Path(...),
):
    if not PhoneEntity.is_valid(phone):
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY)

    phone_entity = PhoneEntity(phone)

    # TODO: Later randomly generate 4-digit code and send it as SMS
    code = TEST_CONFIRMATION_CODE
    if phone_entity.confirmation_code_sent(code):
        phone_obj = Phone.query.filter_by(value=phone).first() or \
            Phone.create(phone)
        phone_obj.set_confirmation_code_to(code)

        return {
            'msg': messages.CONFIRMATION_CODE_SENT_SUCCESS.format(phone),
            'status': True
        }

    raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                        messages.CONFIRMATION_CODE_SENT_ERROR.format(phone))


@router.put(
    '/{confirmation_code}',
    response_model=UserOut,
    tags=['user', 'phone'],
    description=registration_steps,
    status_code=status.HTTP_201_CREATED
)
@limiter.limit('3/minute')
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

        raise HTTPException(status.HTTP_401_UNAUTHORIZED,
                            messages.CONFIRMATION_CODE_IS_INCORRECT)

    raise HTTPException(status.HTTP_404_NOT_FOUND,
                        messages.PHONE_NOT_FOUND)
