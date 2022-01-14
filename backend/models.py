from typing import Any
from loguru import logger
from datetime import datetime
from sqlalchemy import Column, Boolean, String, DateTime, Integer, ForeignKey
from sqlalchemy.orm import relationship

import enums
from db import Base, db
from utils import generate_user_id, generate_user_token


class CreateMixin():
    @classmethod
    def create(cls, data: dict) -> Any:
        obj = cls(**data)
        db.session.add(obj)
        db.session.commit()
        return obj


class EditMixin():
    @classmethod
    def edit(cls, data: dict) -> Any:
        '''Incoming data dictionary mush have primary key id'''
        obj = cls.query.get(data['id'])
        data.pop('id')

        for attr, value in data.items():
            if value != None:
                logger.debug('Setting attr {} to {}', attr, value)
                setattr(obj, attr, value)

        db.session.commit()
        return obj


class Phone(Base):
    '''TODO: Implement strict one to one relationship with User'''
    __tablename__ = 'phone'

    id = Column(Integer, primary_key=True)

    value = Column(String(12), unique=True)
    confirmation_code = Column(String(4))

    confirmed = Column(Boolean, default=False)
    blocked = Column(Boolean, default=False)
    failed_confirmation_attempts = Column(Integer, default=0)

    user = relationship('User', uselist=False, backref='phone_obj')

    def __repr__(self) -> str:
        return f'<Phone #{self.id}: value: {self.value}, code: {self.confirmation_code} for user #{self.user.id}>'

    @classmethod
    def create(cls, phone_value: str) -> Any:
        phone = cls(value=phone_value)
        db.session.add(phone)
        db.session.commit()
        return phone

    def confirmed(self, code: str) -> bool:
        logger.debug(
            'Confirmation code received {} and set confirmation code {} ',
            code, self.confirmation_code
        )
        return self.confirmation_code == code

    def set_confirmation_code_to(self, value: str) -> None:
        logger.debug('Setting confirmation code to', value)
        self.confirmation_code = value
        db.session.commit()


class User(Base, CreateMixin, EditMixin):
    __tablename__ = 'user'

    # id = Column(String(100), primary_key=True, default=generate_user_id)
    id = Column(Integer, primary_key=True)

    name = Column(String(200), nullable=False)

    location = Column(String(500), default=enums.Location.all, nullable=False)
    token = Column(String(100), unique=True, default=generate_user_token)
    device_info = Column(String(300))
    blocked = Column(Boolean, default=False)
    registered_at = Column(DateTime, default=datetime.now)
    last_login_at = Column(DateTime, default=datetime.now)

    phone = Column(Integer, ForeignKey('phone.value'), unique=True)

    posts = relationship('Post', uselist=True, backref='user')

    def __repr__(self) -> str:
        return f'<User #{self.id} name: {self.name}, phone: {self.phone}>'


class Post(Base, CreateMixin, EditMixin):
    __tablename__ = 'post'

    id = Column(Integer, primary_key=True)

    description = Column(String(1000), nullable=False)
    title = Column(String(100), nullable=False)
    location = Column(String(500), default=enums.Location.all, nullable=False)
    category = Column(
        String(500), default=enums.PostCategory.all, nullable=False)
    price = Column(Integer, nullable=False)
    image = Column(String)
    published_at = Column(DateTime, default=datetime.now)

    slug = Column(String(100))
    activated = Column(Boolean, default=False)

    user_id = Column(Integer, ForeignKey('user.id'))

    def __repr__(self) -> str:
        return f'<Post #{self.id} from user {self.user.name}>'

    def set_image(self, file_path: str) -> None:
        self.image = file_path
        db.session.commit()


if __name__ == '__main__':
    from db import init_db
    init_db()
