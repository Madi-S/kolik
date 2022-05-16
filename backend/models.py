from typing import Any
from loguru import logger
from sqlalchemy import Column, Boolean, String, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship

import enums
from db import Base, db
from utils import generate_user_id, generate_user_token, get_unix_time


class CreateMixin():
    @classmethod
    def create(cls, data: dict) -> Any:
        '''Creates db object with given dict data and returns it'''
        obj = cls(**data)
        db.session.add(obj)
        db.session.commit()
        return obj


class DeleteMixin():
    @classmethod
    def delete(cls, id: Any) -> Any:
        '''Deletes db object by id and returns it if exists'''
        obj = cls.query.get(id)
        db.session.delete(obj)
        db.session.commit()
        return obj


class EditMixin():
    def edit(self, data: dict) -> Any:
        '''Edits db object with given dict data and returns it'''
        try:
            data.pop('id')
            data.pop('user_id')
        except:
            pass

        for key, value in data.items():
            if not 'id' in key and value is not None:
                setattr(self, key, value)

        db.session.commit()
        return self


class Phone(Base):
    '''TODO: Implement strict one to one relationship with User'''
    __tablename__ = 'phone'

    id = Column(Integer, primary_key=True)

    value = Column(String(12), unique=True)
    confirmation_code = Column(String(4))

    confirmed = Column(Boolean, default=False)
    blocked = Column(Boolean, default=False)
    failed_confirmation_attempts = Column(Integer, default=0)
    created_at = Column(Float, default=get_unix_time)

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
    registered_at = Column(Float, default=get_unix_time)
    last_login_at = Column(Float, default=get_unix_time)

    phone = Column(Integer, ForeignKey('phone.value'), unique=True)

    posts = relationship('Post', uselist=True, backref='user')
    feedbacks = relationship('Feedback', uselist=True, backref='user')

    def __repr__(self) -> str:
        return f'<User #{self.id} name: {self.name}, phone: {self.phone}>'


class Post(Base, CreateMixin, DeleteMixin, EditMixin):
    __tablename__ = 'post'

    id = Column(Integer, primary_key=True)

    title = Column(String(100), nullable=False)
    description = Column(String(1000), nullable=False)
    location = Column(String(500), default=enums.Location.all, nullable=False)
    category = Column(
        String(500), default=enums.PostCategory.all, nullable=False)
    price = Column(Integer, nullable=False)
    image_uri = Column(String)
    published_at = Column(Float, default=get_unix_time)

    slug = Column(String(100))
    activated = Column(Boolean, default=True)

    user_id = Column(Integer, ForeignKey('user.id'))

    def __repr__(self) -> str:
        return f'<Post #{self.id} from user {self.user.name}>'

    def set_image_uri(self, file_path: str) -> None:
        self.image_uri = file_path
        db.session.commit()

    @classmethod
    def activate(cls, id: int) -> bool:
        '''Returns True if the post was activated, otherwise falsy None'''
        if post := cls.query.get(id):
            post.activated = True
            db.session.commit()
            return True

    @classmethod
    def deactivate(cls, id: int) -> bool:
        '''Returns True if the post was deactivated, otherwise falsy None'''
        if post := cls.query.get(id):
            post.activated = False
            db.session.commit()
            return True


class Feedback(Base, CreateMixin):
    __tablename__ = 'feedback'

    id = Column(Integer, primary_key=True)

    body = Column(String(1000), nullable=False)
    created_at = Column(Float, default=get_unix_time)
    is_read = Column(Boolean, default=True)

    user_id = Column(Integer, ForeignKey('user.id'))

    def __repr__(self) -> str:
        return f'<Feedback #{self.id} from user #{self.user_id}>'


if __name__ == '__main__':
    from db import init_db
    init_db()
