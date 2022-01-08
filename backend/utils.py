from uuid import uuid4

def generate_user_id() -> str:
    return uuid4().hex