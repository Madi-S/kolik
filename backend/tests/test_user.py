from unittest.mock import patch, call


def test_test(test_app):
    response = test_app.get('/test')
    assert response.status_code == 200


def test_post_user(test_app):
    response = test_app.post('/user', json={'name': 'Madi Shaiken'})
    content = response.json()
    assert content
    assert response.status_code == 200


def test_fail_post_user(test_app):
    response = test_app.post(
        '/user', json={'name': 'Madi Shaiken', 'location': 'aboltus'})
    content = response.json()
    assert content
    assert response.status_code == 422


def test_get_user(test_app):
    user_id = '1'
    response = test_app.get(f'/user/{user_id}')
    content = response.json()
    assert content
    assert response.status_code == 200


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