# Asynchronous Tasks with FastAPI, Celery and Docker

### Run on local server

```sh
uvicorn main:app --reload
```

### Update requirements.txt

```sh
pipreqs . --encoding='utf-8' --force --savepath=requirements.in & pip-compile
```

### Push changes to Heroku

```sh
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

### View logs on Heroku

```sh
heroku logs --tail -a kolik-backend
```

### Initialize database models

```sh
python models.py
```

### Make & Run migrations

```sh
alembic revision --autogenerate -m "123"
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
python -m pytest tests/test_user.py1`
python -m pytest tests/test_user.py -r P (show stdout)
python -m pytest -k "test_query_posts"
python -m pytest -k "test_query_posts and not test_get_post_by_id"
```
