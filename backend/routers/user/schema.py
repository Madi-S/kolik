from typing import Any, Optional
from pydantic import validator
from datetime import datetime
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
    name: str
    location: Optional[enums.Location]


class UserOut(Model):
    id: str
    name: str
    token: str
    phone: str
    location: enums.Location

    class Config:
        orm_mode = True
