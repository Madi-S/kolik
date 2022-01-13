from fastapi.testclient import TestClient

from models import User
from routers.user.schema import UserOut


def test_get_users(test_app: TestClient):
    '''GET /user route should return all User entries'''
    response = test_app.get('/user')

    assert response.status_code == 200
    assert len(response.json()) == User.query.count()


def test_get_user_by_id(test_app: TestClient):
    '''GET /user/{id} route should return User model by given id according to UserOut schema'''
    user_id = 2
    response = test_app.get(f'/user/{user_id}')

    user_data = UserOut.from_orm(User.query.get(user_id)).dict()

    assert response.status_code == 200
    assert response.json() == user_data


def test_edit_user(test_app: TestClient):
    '''POST /user should edit User model according to given data arguments'''
    user_id = 2
    data = {'name': 'Edited user name'}
    response = test_app.post(f'/user/{user_id}', json=data)

    user_data = UserOut.from_orm(User.query.get(user_id)).dict()
    
    print(response.json())

    assert response.status_code == 200
    assert response.json() == user_data
    assert response.json()['name'] == 'Edited user name'


# def test_send_confirmation_code(test_app: TestClient):
#     user_id = '1'
#     response = test_app.get(f'/user/{user_id}')
#     content = response.json()
#     assert content
#     assert response.status_code == 200


# def test_create_user(test_app: TestClient):
#     pass


# @patch('worker.create_task.run')
# def test_task(_):
#     assert create_task.run(1)
#     create_task.run.assert_called_once_with(1)

#     assert create_task.run(2)
#     assert create_task.run.call_count == 2

#     assert create_task.run(3)
#     assert create_task.run.call_count == 3


# def test_task_status(test_app):
#     response = test_app.post('/tasks', data=json.dumps({'type': 1}))
#     content = response.json()
#     task_id = content['task_id']
#     assert task_id

#     response = test_app.get(f'tasks/{task_id}')
#     content = response.json()
#     assert content == {'task_id': task_id,
#                        'task_status': 'PENDING', 'task_result': None}
#     assert response.status_code == 200

#     while content['task_status'] == 'PENDING':
#         response = test_app.get(f'tasks/{task_id}')
#         content = response.json()
#     assert content == {'task_id': task_id,
#                        'task_status': 'SUCCESS', 'task_result': True}
