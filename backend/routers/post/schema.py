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
    category: enums.PostCategory
    sort_by_option: enums.PostSortByOption


class PostQuery(Model):
    q: str
    from_: Optional[int] = 0
    to: Optional[int] = 10
    filters: PostFilters


class PostBaseModel(Model):
    title: str
    price: int
    image: Any
    description: str
    location: enums.Location
    category: enums.PostCategory


class PostIn(PostBaseModel):
    user_id: int


class PostOut(PostBaseModel):
    id: int

    class Config:
        orm_mode = True
