from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

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


images = []


@app.post('/image', tags=['test'])
async def test_image(image: UploadFile = File(...)):
    contents = await image.read()

    with open(f'images/{image.filename}', 'wb') as f:
        f.write(contents)

    images.append(contents)

    return {'filename': image.filename}


@app.get('/images/', tags=['test'])
async def read_random_file():
    path = f'images/potnyara.png'
    return FileResponse(path)
