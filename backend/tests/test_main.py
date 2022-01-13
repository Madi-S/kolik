

def test_home(test_app):
    response = test_app.get('/')
    assert response.status_code == 200
    assert response.json() == {
        'msg': 'Check out the /docs route for more information'}


def test_test(test_app):
    response = test_app.get('/test')
    assert response.status_code == 200
    assert response.json() == {'msg': 'Hello World'}
