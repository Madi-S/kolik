import os
import sys
from typing import List
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import schema
from models import User


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, '.env'))

app = FastAPI()

origins = [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=['*'],
    allow_headers=['*']
)

if not sys.platform.startswith('win'):
    from fastapi_sqlalchemy import DBSessionMiddleware
    app.add_middleware(
        DBSessionMiddleware,
        db_url=os.environ['DATABASE_URL']
    )
    ...


@app.get('/test')
def test():
    return {'hello': 'world'}


@app.get('/user/create', response_model=schema.UserOut, tags=['user'])
def user_create(data: schema.UserIn):
    user = User.create(data.dict())
    return user


@app.get('/user/query', response_model=List[schema.UserOut], tags=['user'])
def user_query():
    users = User.query.all()
    return users

@app.get('/user/get', response_model=schema.UserOut, tags=['user'])
def user_get():
    users = User.query.all()
    return users


'''
uvicorn main:app --reload
'''
