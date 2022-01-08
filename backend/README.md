# Asynchronous Tasks with FastAPI, Celery and Docker

### Initialize
```sh
docker-compose build
docker-compose up
```

### Make & Run migrations
```sh
docker-compose run web alembic revision --autogenerate -m "I am a teapot"
docker-compose run web alembic upgrade head
```

### Want to learn how to build this?

Check out the [post](https://testdriven.io/blog/fastapi-and-celery/).

### Spin up the containers:

```sh
docker-compose up -d --build
```

### For more workers:

```sh
docker-compose up -d --build --scale worker=3
```

### Run tests:

```sh
docker-compose exec web python -m pytest -k "test_task and not test_home"

docker-compose exec web python -m pytest -k "test_mock_task"
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
