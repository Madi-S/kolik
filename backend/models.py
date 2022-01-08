import sqlalchemy
from typing import Any

from db import db, metadata, sqlalchemy

tests = sqlalchemy.Table(
    'tests',
    metadata,
    sqlalchemy.Column('id', sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column('first_name', sqlalchemy.String),
    sqlalchemy.Column('last_name', sqlalchemy.String),
    sqlalchemy.Column('age', sqlalchemy.Integer)
)


class Test:
    @classmethod
    async def get(cls, id: int):
        query = tests.select().where(tests.c.id == id)
        user = await db.fetch_one(query)
        return user

    @classmethod
    async def create(cls, **user: Any):
        query = tests.insert().values(**user)
        user_id = await db.execute(query)
        return user_id
