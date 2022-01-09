import os
import time

from celery import Celery
from celery.schedules import crontab
from celery.result import AsyncResult


celery = Celery(__name__)
celery.conf.broker_url = os.environ.get(
    'CELERY_BROKER_URL', 'redis://localhost:6379')
celery.conf.broker_url = os.environ.get(
    'CELERY_RESULT_BACKEND', 'redis://localhost:6379')


@celery.task(name='sleep')
def sleep(task_length):
    time.sleep(int(task_length))
    return 'Slept long enough'
