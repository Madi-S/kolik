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
    price_from: int = 0
    price_to: int = 9999999
    location: enums.Location
    category: enums.PostCategory
    order_by_option: enums.PostOrderByOption


class PostQuery(Model):
    q: str
    filters: PostFilters
    from_: Optional[int] = 0
    to: Optional[int] = 10


class PostBaseModel(Model):
    title: str
    price: int
    description: str
    image: Optional[Any]
    location: enums.Location
    category: enums.PostCategory


class PostIn(PostBaseModel):
    user_id: int


class PostEditIn(PostBaseModel):
    user_id: int
    id: int


class PostOut(PostBaseModel):
    id: int

    class Config:
        orm_mode = True
