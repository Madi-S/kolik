from typing import Optional
from pydantic import validator
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
    order_by_option: enums.PostOrderByOption


class PostQuery(Model):
    q: str
    filters: PostFilters
    from_: Optional[int] = 0
    to: Optional[int] = 10
    category: enums.PostCategory


class PostBaseModel(Model):
    title: str
    price: int
    description: str
    location: enums.Location
    category: enums.PostCategory


class PostIn(PostBaseModel):
    user_id: int


class PostEditIn(PostBaseModel):
    '''
    Does not matter if any attribute is `None` because EditMixin will not apply None attribute values; `id` is provided in the path. Only `user_id` is mandatory for authentication
    '''
    user_id: int
    title: Optional[str] = None
    price: Optional[int] = None
    description: Optional[str] = None
    location: Optional[enums.Location] = None
    category: Optional[enums.PostCategory] = None


class PostOut(PostBaseModel):
    id: int
    # published_at: float

    class Config:
        orm_mode = True
