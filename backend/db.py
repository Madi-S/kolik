import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, '.env'))


# check_same_thread is only for sqlite
engine = create_engine(os.environ['DATABASE_URL'], connect_args={
                       'check_same_thread': False})
db_session = scoped_session(sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
))

Base = declarative_base()
Base.query = db_session.query_property()
metadata = Base.metadata

class db:
    session = db_session


def init_db():
    '''!!! MUST BE CALLED INSIDE `models.py` !!!'''
    print('Initializing database')
    try:
        print('Initializion successful')
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f'Initializion failed {e}')
