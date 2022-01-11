# Asynchronous Tasks with FastAPI, Celery and Docker

### Run on local server

```sh
uvicorn main:app --reload
```

### View logs on Heroku

```sh
heroku logs --tail -a kolik-backend
```

### Make & Run migrations

```sh
alembic revision --autogenerate -m "I am a teapot"
alembic upgrade head
```

### In case alembic behaves abnormally

1. Drop alembic database (use sqlitestudio for instance)
2.

```sh
alembic stamp head
alembic revision --autogenerate -m "New revision"
alembic upgrade head
alembic stamp head
```

### Run tests:

```sh
python -m pytest
python -m pytest -k "test_task and not test_home"
```
