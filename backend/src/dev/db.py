from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker


DB_URL = 'sqlite:///./kolik.db'

# check_same_thread is only for sqlite
engine = create_engine(DB_URL, connect_args={'check_same_thread': False})
db_session = scoped_session(sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
))

Base = declarative_base()
Base.query = db_session.query_property()

class db:
    session = db_session


def init_db():
    '''!!! MUST BE CALLED INSIDE `models.py` !!!'''
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
