from fastapi.testclient import TestClient

from random import randint

from models import User, Phone
from routers.user.schema import UserOut
from routers.user.api import TEST_CONFIRMATION_CODE


USER_ID = 2
PHONE = '+7778415' + str(randint(1000, 9999))


def test_get_users(test_app: TestClient):
    '''GET /user route should return all User entries'''
    response = test_app.get('/user')

    assert response.status_code == 200
    assert len(response.json()) == User.query.count()


def test_get_user_by_id(test_app: TestClient):
    '''GET /user/{id} route should return User model by given id according to UserOut schema'''
    response = test_app.get(f'/user/{USER_ID}')

    user_data = UserOut.from_orm(User.query.get(USER_ID)).dict()

    assert response.status_code == 200
    assert response.json() == user_data


def test_edit_user(test_app: TestClient):
    '''POST /user route should edit User model according to given data arguments'''
    expected_user_name = 'Edited user name'
    data = {'name': expected_user_name}
    response = test_app.post(f'/user/{USER_ID}', json=data)

    user_data = UserOut.from_orm(User.query.get(USER_ID)).dict()

    assert response.json() == user_data
    assert response.json()['name'] == expected_user_name
    assert response.status_code == 200


def test_send_confirmation_code(test_app: TestClient):
    '''POST /user/send-code/{phone} route should send confirmation code to provided phone and set this code for database model as well'''
    expected_msg = {
        'msg': f'Confirmation code sent to {PHONE}', 'status': True
    }
    response = test_app.post(f'/user/send-code/{PHONE}')

    phone_obj = Phone.query.filter_by(value=PHONE).first()

    assert response.status_code == 200
    assert response.json() == expected_msg
    assert isinstance(phone_obj.confirmation_code, str)
    assert len(phone_obj.confirmation_code) == 4


def test_create_user(test_app: TestClient):
    '''PUT /user/{confirmation_code} route should create User model if provided confirmation code is correct'''
    json = {'name': 'New user name', 'phone': PHONE}
    response = test_app.put(
        f'/user/{TEST_CONFIRMATION_CODE}', json=json
    )

    user_data = UserOut.from_orm(
        User.query.filter_by(phone=PHONE).first()
    ).dict()

    assert response.status_code == 200
    assert response.json() == user_data
