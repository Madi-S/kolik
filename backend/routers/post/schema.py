from typing import Any, Optional
from pydantic import validator
from datetime import datetime
from fastapi_camelcase import CamelModel

import enums


class Model(CamelModel):
    '''CamelModel already inherits from pydantic's BaseModel'''
    class Config:
        use_enum_values = True


class PostFilters(Model):
    price_from: int
    price_to: int
    location: enums.Location
    sort_by_option: enums.PostSortByOption


class PostQuery(Model):
    query: str
    category: enums.PostCategory
    filters: PostFilters


class PostIn(Model):
    ...


class PostOut(Model):
    ...

    class Config:
        orm_mode = True
