from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from http_.services import limiter
from routers.user.api import router as user_router
from routers.post.api import router as post_router
from routers.misc.api import router as misc_router


app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


origins = [
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(post_router)
app.include_router(misc_router)


@app.get("/", tags=["test"])
async def home():
    return {"msg": "Check out the /docs route for more information"}


@app.get("/test", tags=["test"])
async def test():
    return {"msg": "Hello World"}
