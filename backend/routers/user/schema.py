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


class UserEditIn(Model):
    '''
    Does not matter if any attribute is `None` because EditMixin will not apply None attribute values; `id` is provided in the path.
    '''
    name: Optional[str] = None
    location: Optional[enums.Location] = None


class UserOut(Model):
    id: int
    name: str
    token: str
    phone: str
    location: enums.Location

    class Config:
        orm_mode = True
