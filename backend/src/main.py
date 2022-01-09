import os
import sys
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.user.api import router as user_router
from routers.user.api import router as post_router


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

app.include_router(user_router)
app.include_router(post_router)


if not sys.platform.startswith('win'):
    # from fastapi_sqlalchemy import DBSessionMiddleware
    # app.add_middleware(
    #     DBSessionMiddleware,
    #     db_url=os.environ['DATABASE_URL']
    # )
    ...


@app.get('/test')
async def test():
    return {'hello': 'world'}


'''
uvicorn main:app --reload
'''
