from pydantic import validator
from fastapi_camelcase import CamelModel


class Model(CamelModel):
    """CamelModel already inherits from pydantic's BaseModel"""

    class Config:
        use_enum_values = True


class FeedbackIn(Model):
    body: str
    user_id: str

    @validator("body")
    def body_must_not_exceed_1000_chars(cls, body: str):
        if len(body) > 1000:
            raise ValueError("Body must not exceed 1000 charactesrs")
        return body


class FeedbackOut(Model):
    body: str
    user_id: str

    class Config:
        orm_mode = True
