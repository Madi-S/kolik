from humps import camelize
from uuid import uuid4


def to_camel(s: str) -> str:
    return camelize(str)


def generate_user_id() -> str:
    return uuid4().hex


def generate_user_token() -> str:
    return uuid4().hex
