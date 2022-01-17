from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.user.api import router as user_router
from routers.post.api import router as post_router


app = FastAPI()

origins = [
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://localhost:3000'
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


@app.get('/', tags=['test'])
async def home():
    return {'msg': 'Check out the /docs route for more information'}


@app.get('/test', tags=['test'])
async def test():
    return {'msg': 'Hello World'}
