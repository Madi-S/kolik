from fastapi.testclient import TestClient

from random import randint

import enums
from models import User, Phone
from routers.user.schema import UserOut
from routers.user.api import TEST_CONFIRMATION_CODE


USER_ID = User.query.first().id
PHONE = "+7778415" + str(randint(1000, 9999))


def test_get_users__success(test_app: TestClient):
    """GET /user route should return all User entries"""
    response = test_app.get("/user")

    assert response.status_code == 200
    assert len(response.json()) == User.query.count()


def test_get_users__fail_limit(test_app: TestClient):
    """GET /user route should raise 429 status code after 2 requests in a minute"""
    test_app.get("/user")
    test_app.get("/user")
    response = test_app.get("/user")

    assert response.status_code == 429


def test_get_user_by_id__success(test_app: TestClient):
    """GET /user/{id} route should return User model by given id according to UserOut schema"""
    response = test_app.get(f"/user/{USER_ID}")

    user_data = UserOut.from_orm(User.query.get(USER_ID)).dict()

    assert response.status_code == 200
    assert response.json() == user_data


def test_get_user_by_id__fail_not_found(test_app: TestClient):
    """GET /user/{id} route should raise 404 status code for non existing user id"""
    non_existing_user_id = USER_ID + str(randint(1000, 9999))
    response = test_app.get(f"/user/{non_existing_user_id}")

    assert User.query.get(non_existing_user_id) is None
    assert response.status_code == 404


def test_edit_user__success(test_app: TestClient):
    """POST /user route should edit User model according to given data arguments"""
    expected_name = "Edited user name"
    expected_location = enums.Location.almaty
    data = {"name": expected_name, "location": expected_location}
    response = test_app.post(f"/user/{USER_ID}", json=data)

    user_obj = User.query.get(USER_ID)

    assert response.status_code == 204
    assert user_obj.name == expected_name
    assert user_obj.location == expected_location


def test_edit_user__fail_schema(test_app: TestClient):
    """POST /user route should raise 422 status code for invalid incoming json data (location) and user data is not changed in the database"""
    user_obj_before = User.query.get(USER_ID)
    invalid_json = {"name": "Madisson", "location": "bobaba"}

    response = test_app.post(f"/user/{USER_ID}", json=invalid_json)

    user_obj_after = User.query.get(USER_ID)

    assert user_obj_before == user_obj_after
    assert response.status_code == 422


def test_send_confirmation_code__success(test_app: TestClient):
    """POST /user/send-code/{phone} route should send confirmation code to provided phone and set this code for database model as well"""
    expected_msg = {"msg": f"Confirmation code sent to {PHONE}", "status": True}
    response = test_app.post(f"/user/send-code/{PHONE}")

    phone_obj = Phone.query.filter_by(value=PHONE).first()

    assert response.status_code == 200
    assert response.json() == expected_msg
    assert isinstance(phone_obj.confirmation_code, str)
    assert len(phone_obj.confirmation_code) == 4


def test_send_confirmation_code__fail_phone_format(test_app: TestClient):
    """POST /user/send-code/{phone} route should raise 422 status code for invalid phone number format"""
    invalid_phone = PHONE.replace("+", "")
    phone_obj = Phone.query.filter_by(value=invalid_phone).first()

    response = test_app.post(f"/user/send-code/{invalid_phone}")

    assert phone_obj is None
    assert response.status_code == 422


def test_create_user__success(test_app: TestClient):
    """PUT /user/{confirmation_code} route should create User model if provided confirmation code is correct and request for phone confirmation is made"""
    json = {"name": "New user name", "phone": PHONE}

    test_app.post(f"/user/send-code/{PHONE}")
    response = test_app.put(f"/user/{TEST_CONFIRMATION_CODE}", json=json)

    user_data = UserOut.from_orm(User.query.filter_by(phone=PHONE).first()).dict()

    assert response.status_code == 201
    assert response.json() == user_data


def test_create_user__fail_schema(test_app: TestClient):
    """PUT /user/{confirmation_code} route should raise 422 for invalid incoming json data (phone)"""
    invalid_phone = PHONE.replace("+", "") + str(randint(0, 9))
    invalid_json = {"name": "New user name", "phone": invalid_phone}

    test_app.post(f"/user/send-code/{invalid_phone}")
    response = test_app.put(f"/user/{TEST_CONFIRMATION_CODE}", json=invalid_json)

    assert response.status_code == 422
