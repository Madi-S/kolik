# Asynchronous Tasks with FastAPI, Celery and Docker


### Make & Run migrations
```sh
alembic revision --autogenerate -m "I am a teapot"
alembic upgrade head
```


### Run tests:
```sh
python -m pytest
python -m pytest -k "test_task and not test_home"
```

Open your browser to [http://localhost:8004](http://localhost:8004) to view the app or to [http://localhost:5556](http://localhost:5556) to view the Flower dashboard.

Trigger a new task:

```sh
$ curl http://localhost:8004/tasks -H "Content-Type: application/json" --data '{"delay": 5}'
```

Check the status:

```sh
$ curl http://localhost:8004/tasks/<TASK_ID>
```
