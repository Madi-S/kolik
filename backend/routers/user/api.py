from typing import List
from loguru import logger
from fastapi import APIRouter, Path, HTTPException

from models import User, Phone
from .utils import PhoneEntity
from .schema import UserOut, UserIn


router = APIRouter(
    prefix='/user',
    tags=['user'],
    # dependencies=[Depends(get_token_header)]
)

TEST_CONFIRMATION_CODE = '2222'

registration_steps = '''
Registration steps:
1) Create Phone object (ignore if exists) and set confirmation code, which is sent to the user.
2) Create User object by providing name, phone and location, if provided confirmation code is correct.
'''


@router.get('/', response_model=List[UserOut], tags=['user'])
async def get_users():
    users = User.query.all()
    return users


@router.get('/{id}', response_model=UserOut, tags=['user'])
async def get_user_by_id(id: int = Path(...)):
    user = User.query.get(id)
    if user is None:
        return HTTPException(404, 'User not found')
    return user


@router.post('/{id}', response_model=UserOut, tags=['user'])
async def edit_user(data: UserIn, id: int = Path(...)):
    data_dict = data.dict()
    data_dict.update({'id': id})
    
    user = User.edit(data_dict)
    return user


@router.post(
    '/send-code/{phone}',
    tags=['user', 'phone'],
    description=registration_steps
)
async def send_confirmation_code(phone: str = Path(...)):
    phone_entity = PhoneEntity(phone)
    if phone_entity.is_valid():
        code = TEST_CONFIRMATION_CODE
        if phone_entity.confirmation_code_sent(code):
            phone_obj = Phone.query.filter_by(
                value=phone).first() or Phone.create(phone)
            phone_obj.set_confirmation_code_to(code)

            return {'msg': f'Confirmation code sent to {phone}', 'status': True}

        return {'msg': f'Confirmation was not code sent to {phone}', 'status': False}

    return {'msg': f'Phone {phone} is not valid', 'status': False}


@router.put(
    '/confirm/{phone}/{confirmation_code}',
    response_model=UserOut,
    tags=['user', 'phone'],
    description=registration_steps
)
async def create_user(
    data: UserIn,
    phone: str = Path(...),
    confirmation_code: str = Path(...)
):
    if phone_obj := Phone.query.filter_by(value=phone).first():
        if phone_obj.confirmed(confirmation_code):
            logger.debug('Phone confirmed successfully')
            data_dict = data.dict()
            data_dict.update({'phone': phone_obj})

            user = User.query.filter_by(
                phone=phone_obj).first() or User.create(data_dict)
            return user
        else:
            raise HTTPException(404, 'Confirmation code is incorrect')
    raise HTTPException(404,
                        'Phone was not found, try sending a confirmation code to it first')
