from typing import Optional
from pydantic import validator
from fastapi_camelcase import CamelModel

import enums


class Model(CamelModel):
    '''CamelModel already inherits from pydantic's BaseModel'''
    class Config:
        use_enum_values = True


class UserIn(Model):
    name: str
    phone: str
    location: Optional[enums.Location]

    @validator('name')
    def name_must_be_between_3_and_30_chars(cls, name: str):
        if len(name) >= 3 and len(name) <= 30:
            return name
        raise ValueError('Name must be between 3 and 30 characters')

    @validator('phone')
    def phone_must_be_12_chars_long(cls, phone: str):
        if len(phone) == 12:
            return phone
        raise ValueError('Phone must be 12 characters long')

    @validator('phone')
    def phone_must_start_with_plus(cls, phone: str):
        if phone.startswith('+'):
            return phone
        raise ValueError('Phone must start with +')

    @validator('phone')
    def phone_must_be_digit(cls, phone: str):
        if phone[1:].isdigit():
            return phone
        raise ValueError('Phone must be a valid number')


class UserEditIn(Model):
    '''
    Does not matter if any attribute is `None` because EditMixin will not apply None attribute values; `id` is provided in the path.
    '''
    name: Optional[str] = None
    location: Optional[enums.Location] = None

    @validator('name')
    def name_must_be_between_3_and_30_chars(cls, name: str, values, **kwargs):
        if len(name) >= 3 and len(name) <= 30:
            return name
        raise ValueError('Name must be between 3 and 30 characters')


class UserOut(Model):
    id: str
    name: str
    token: str
    phone: str
    location: enums.Location

    class Config:
        orm_mode = True
