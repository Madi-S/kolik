from typing import List
from fastapi import APIRouter, Path

from models import User, Phone
from .utils import PhoneEntity
from .schema import UserIn, UserOut


router = APIRouter(
    prefix='/user',
    tags=['user'],
    # dependencies=[Depends(get_token_header)]
)

TEST_CONFIRMATION_CODE = '2222'

'''
Registration steps:
1) Create Phone object (ignore if exists) and set confirmation code, which is sent to the user.
2) Create User object by providing name, phone and location, if provided confirmation code is correct.
'''


@router.get('/user/', response_model=List[UserOut], tags=['user'])
async def get_users():
    users = User.query.all()
    return users


@router.get('/user/{index}', response_model=UserOut, tags=['user'])
async def get_user_by_index(index: int = Path(...)):
    user = User.query.all()[index]
    return user


@router.post('/user/send-confirmation-code/{phone}', tags=['user'])
async def send_confirmation_code(phone: str = Path(...)):
    phone_entity = PhoneEntity(phone)
    if phone_entity.is_valid():
        code = TEST_CONFIRMATION_CODE
        if phone_entity.confirmation_code_sent(code):
            phone_obj = Phone.query.get(phone) or Phone.create(phone)
            phone_obj.set_confirmation_code_to(code)


@router.put('/user/{phone}/{confirmation_code}', response_model=UserOut, tags=['user'])
async def create_user(
    data: UserIn,
    phone: str = Path(...),
    confirmation_code: str = Path(...)
):
    if phone_obj := Phone.query.get(phone):
        if phone_obj.confirm(confirmation_code):
            data_dict = data.dict()
            data_dict.update({'phone': phone_obj})

            user = User.query.filter_by(
                phone=phone_obj).first() or User.create(data_dict)
            return user
