from typing import Any, Optional
from pydantic import validator
from datetime import datetime
from fastapi_camelcase import CamelModel

import enums


class Model(CamelModel):
    '''CamelModel already inherits from pydantic's BaseModel'''
    class Config:
        use_enum_values = True


class PostIn(Model):
    ...

class PostOut(Model):
    ...

    class Config:
        orm_mode = True
