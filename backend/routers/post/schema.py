from typing import Optional
from pydantic import validator, Field
from fastapi_camelcase import CamelModel

import enums


class Model(CamelModel):
    '''CamelModel already inherits from pydantic's BaseModel'''
    class Config:
        use_enum_values = True


class PostFilters(Model):
    price_from: int = 0
    price_to: int = 999999999
    location: enums.Location
    order_by_option: enums.PostOrderByOption

    @validator('price_to')
    def price_to_must_be_greater_than_price_from(cls, price_to: int, values: dict):
        price_from = values.get('price_from')
        if price_to > price_from:
            return price_to
        raise ValueError('Price to must be greater than price_from')

    @validator('price_from')
    def price_from_must_be_positive_number(cls, price_from: int):
        if price_from >= 0:
            return price_from
        raise ValueError('Price from must be a positive number')


class PostQuery(Model):
    q: str
    filters: PostFilters
    from_: Optional[int] = 0
    to: Optional[int] = 10
    category: enums.PostCategory

    @validator('q')
    def q_must_not_exceed_100_chars(cls, q: str):
        if len(q) > 100:
            raise ValueError('Query must not exceed 100 characters')
        return q

    @validator('to')
    def to_must_be_greater_than(cls, to: int, values: dict):
        from_ = values.get('from_')
        if to > from_:
            return to
        raise ValueError('To must be greater than from_')


class PostBaseModel(Model):
    title: str
    price: int
    description: str
    location: enums.Location
    category: enums.PostCategory

    @validator('description')
    def description_must_not_exceed_2000_chars(cls, description: str):
        if len(description) > 2000:
            raise ValueError('Description must not exceed 2000 characters')
        return description

    @validator('title')
    def description_must_not_exceed_100_chars(cls, title: str):
        if len(title) > 100:
            raise ValueError('Title must not exceed 2000 characters')
        return title

    @validator('price')
    def price_must_be_positive_number(cls, price_from: int):
        if price_from >= 0:
            return price_from
        raise ValueError('Price must be a positive number')


class PostIn(PostBaseModel):
    user_id: str


class PostEditIn(PostBaseModel):
    '''
    Does not matter if any attribute is `None` because EditMixin will not apply None attribute values; `id` is provided in the path. Only `user_id` is mandatory for authentication
    '''
    user_id: str
    title: Optional[str] = None
    price: Optional[int] = None
    description: Optional[str] = None
    location: Optional[enums.Location] = None
    category: Optional[enums.PostCategory] = None


class PostOut(PostBaseModel):
    id: str
    activated: bool
    published_at: float = Field(None, alias='publishedAt')

    class Config:
        orm_mode = True
