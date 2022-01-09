import os
import sys
from typing import Any, List
from dotenv import load_dotenv
from fastapi import FastAPI

import schema
from models import User

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, '.env'))

app = FastAPI()

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


'''
uvicorn main:app --reload
'''
