import sys
from typing import Any
from datetime import datetime
from sqlalchemy import Column, Boolean, String, DateTime, Integer, ForeignKey
from sqlalchemy.orm import relationship

from utils import generate_user_id, generate_user_token


if sys.platform.startswith('win'):
    from dev.db import Base, db
else:
    # from fastapi_sqlalchemy import db
    from sqlalchemy.ext.declarative import declarative_base

    Base = declarative_base()


class CreateMixin():
    @classmethod
    def create(cls, data: dict) -> Any:
        obj = cls(**data)
        db.session.add(obj)
        db.session.commit()
        return obj


class Phone(Base):
    '''TODO: Implement strict one to one relationship with User'''
    __tablename__ = 'phone'

    value = Column(String(12), primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), unique=True)
    confirmation_code = Column(String(4))
    confirmed = Column(Boolean, default=False)
    blocked = Column(Boolean, default=False)
    failed_confirmation_attempts = Column(Integer, default=0)

    def __repr__(self):
        return f'<Phone: {self.value}, confirmed: {self.confirmed}, user_id: {self.user_id}, code: {self.confirmation_code}>'

    @classmethod
    def create_or_login(cls, phone_value: str) -> Any:
        phone = cls(value=phone_value)
        db.session.add(phone)
        db.session.commit()
        return phone

    def confirm(self, code: str) -> bool:
        if self.confirmation_code == code:
            # self.confirmed = True
            return True

    def set_confirmation_code_to(self, value: str) -> None:
        self.confirmation_code = value
        db.session.commit()


class User(Base, CreateMixin):
    __tablename__ = 'user'

    id = Column(String(100), primary_key=True, default=generate_user_id)
    token = Column(String(100), unique=True, default=generate_user_token)
    name = Column(String(200), nullable=False)
    location = Column(String(200))
    device_info = Column(String(300))
    blocked = Column(Boolean, default=False)
    registered_at = Column(DateTime, default=datetime.now)
    last_login_at = Column(DateTime, default=datetime.now)
    phone = relationship('Phone', uselist=False,
                         backref='user')

    def __repr__(self) -> str:
        return f'<User #{self.id} name: {self.name}>'


if __name__ == '__main__' and sys.platform.startswith('win'):
    from dev.db import init_db

    print('Initializing database')
    try:
        init_db()
        print('Initializion successful')
    except Exception as e:
        print(f'Initializion failed {e}')
