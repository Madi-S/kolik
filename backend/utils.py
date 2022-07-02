from enum import Enum
from uuid import uuid4
from datetime import datetime


def generate_user_id() -> str:
    return uuid4().hex


def generate_user_token() -> str:
    return uuid4().hex


def beautify_datetime(datetime: datetime) -> str:
    return datetime.strftime("%B, %d, %Y at %H:%M")


def get_list_of_enum_value(enum: Enum) -> list:
    return list(map(lambda x: x.value, enum._member_map_.values()))


def get_unix_time() -> float:
    return datetime.now().timestamp()
