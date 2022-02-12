from fastapi_camelcase import CamelModel


class Model(CamelModel):
    '''CamelModel already inherits from pydantic's BaseModel'''
    class Config:
        use_enum_values = True


class FeedbackIn(Model):
    body: str
    user_id: int


class FeedbackIn(Model):
    id: int
    body: str

    class Config:
        orm_mode = True
