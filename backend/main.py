from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_admin.app import app as admin_app
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from routers.user.api import router as user_router
from routers.post.api import router as post_router
from routers.misc.api import router as misc_router


app = FastAPI()

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

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
app.include_router(misc_router)

app.mount('/admin', admin_app)


@app.get('/', tags=['test'])
async def home():
    return {'msg': 'Check out the /docs route for more information'}


@app.get('/test', tags=['test'])
async def test():
    return {'msg': 'Hello World'}
