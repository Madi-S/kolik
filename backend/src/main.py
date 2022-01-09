import os
from typing import Any, List
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, '.env'))

app = FastAPI()

app.add_middleware(
    DBSessionMiddleware,
    db_url=os.environ['DATABASE_URL']
)

@app.get('/test/')
def test():
    return {'hello': 'world'}

'''
Run
uvicorn main:app --reload
'''
