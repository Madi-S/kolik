from fastapi import status, Header, HTTPException

from typing import Any
from slowapi import Limiter
from slowapi.util import get_remote_address

from models import User
from config import TEST_AUTH_TOKEN


limiter = Limiter(key_func=get_remote_address)


# !!! Make sure that Header will be mandatory in producation build
def validate_auth_token(
    x_token: str = Header(TEST_AUTH_TOKEN, alias="auth-token")
) -> Any:
    user_doesnot_exists = not bool(User.query.filter_by(token=x_token).first())
    if user_doesnot_exists and x_token != TEST_AUTH_TOKEN:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User is not authenticated")
