import sys
from typing import Any
from datetime import datetime
from sqlalchemy import Column, Boolean, String, DateTime

from utils import generate_user_id, generate_user_token


if sys.platform.startswith('win'):
    from dev.db import Base, db
else:
    # from fastapi_sqlalchemy import db
    from sqlalchemy.ext.declarative import declarative_base

    Base = declarative_base()


class CreateMixin():
    @classmethod
    def create(cls, **data) -> Any:
        obj = cls(**data)
        db.session.add(obj)
        db.session.commit()
        return obj


class User(Base, CreateMixin):
    __tablename__ = 'users'

    id = Column(String(100), primary_key=True, default=generate_user_id)
    token = Column(String(100), unique=True, default=generate_user_token)
    name = Column(String(200), nullable=False)
    location = Column(String(200))
    device_info = Column(String(300))
    blocked = Column(Boolean, default=False)
    registered_at = Column(DateTime, default=datetime.now)
    last_login_at = Column(DateTime, default=datetime.now)

    def __repr__(self) -> str:
        return f'<User #{self.id} {self.name}>'


if __name__ == '__main__' and sys.platform.startswith('win'):
    from dev.db import init_db

    print('Initializing database')
    try:
        init_db()
        print('Initializion successful')
    except Exception as e:
        print(f'Initializion failed {e}')
