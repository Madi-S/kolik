import sqlalchemy
from typing import Optional, Any, Tuple, Union, List

from utils import generate_user_id
from db import db, metadata, sqlalchemy

users = sqlalchemy.Table(
    'users',
    metadata,
    sqlalchemy.Column('id', sqlalchemy.String, primary_key=True, default=generate_user_id),
    sqlalchemy.Column('name', sqlalchemy.String),
    sqlalchemy.Column('phone', sqlalchemy.String),
    sqlalchemy.Column('location', sqlalchemy.String),
)


class User:
    @classmethod
    async def get(cls, id):
        query = users.select().where(users.c.id == id)
        user = await db.fetch_one(query)
        return user

    @classmethod
    async def create(cls, **user):
        query = users.insert().values(**user)
        user_id = await db.execute(query)
        return user_id
    
    
class LastLogin:
    @classmethod
    async def set(cls, **kwargs):
        ...