from fastapi.testclient import TestClient

from models import User, Feedback

from routers.misc.schema import FeedbackOut

POST_ID = 6
USER_ID = 1


def test_create_feedback(test_app: TestClient):
    '''PUT /feedback route should return created feedback and create a db Feedback object'''
    json = {
        'userId': USER_ID,
        'body': 'Random text for feedback, great application!!!'
    }

    response = test_app.put('/misc/feedback', json=json)

    feedback_obj = User.query.get(USER_ID).feedbacks[-1]
    created_feedback = FeedbackOut.from_orm(feedback_obj).dict(by_alias=True)

    assert response.status_code == 200
    assert response.json() == created_feedback
