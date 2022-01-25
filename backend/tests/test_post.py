from fastapi.testclient import TestClient

import os.path
from sqlalchemy import or_
from random import randint, choice

import enums
from models import Post, User

from routers.post.schema import PostOut
from routers.post.api import IMAGES_FOLDER
from routers.post.utils import generate_image_uri

POST_ID = 6
USER_ID = 1


def test_query_posts(test_app: TestClient):
    '''POST /post/query route should return a list of posts according to given query parameters'''
    from_ = randint(1, 4)
    to = randint(5, 9)
    price_from = 0
    price_from = randint(0, 10)
    price_to = randint(999999999, 999999999999)
    q = choice(('a', 'b', 'c', 'd', 'e', 'f'))
    location = enums.Location.all
    category = enums.PostCategory.all
    # SQLAlchemy automatically orders entries by published_at
    order_by_option = enums.PostOrderByOption.published_at_asc

    json = {
        'q': q,
        'from_': from_,
        'to': to,
        'category': category,
        'filters': {
            'priceTo': price_to,
            'priceFrom': price_from,
            'location': location,
            'orderByOption': order_by_option
        }
    }
    response = test_app.post('/post/query', json=json)

    filtered_posts = Post.query.filter(
        or_(
            Post.title.ilike(f'%{q}%'),
            Post.description.ilike(f'%{q}%'),
        )
    ).filter(Post.price >= price_from).filter(Post.price <= price_to).offset(from_).limit(to - from_)

    assert response.status_code == 200
    assert len(response.json()) == filtered_posts.count()


def test_get_post_by_id(test_app: TestClient):
    '''GET /post/{id} route should return User model by given id according to UserOut schema'''
    response = test_app.get(f'/post/{POST_ID}')

    post_data = PostOut.from_orm(Post.query.get(POST_ID)).dict()

    assert response.status_code == 200
    assert response.json() == post_data


def test_create_post(test_app: TestClient):
    '''PUT /post route should create post in the database with given arguments and return it'''
    json = {
        'title': 'test', 'price': 42, 'description': 'test',
        'location': enums.Location.kokshetau, 'category': enums.PostCategory.suv, 'userId': 1
    }
    response = test_app.put(f'/post/', json=json)

    post_id = response.json()['id']
    post_obj = Post.query.get(post_id)
    post_data = PostOut.from_orm(post_obj).dict()

    assert response.status_code == 200
    assert response.json() == post_data

    user_post_obj = User.query.get(USER_ID).posts[-1]
    user_post_data = PostOut.from_orm(post_obj).dict()

    assert user_post_obj == post_obj
    assert response.json() == user_post_data


def test_edit_post(test_app: TestClient):
    '''POST /post/{id} route should edit post in the database with given arguments and return edited post'''
    expected_title = 'Changed title'
    expected_price = 228
    json = {'title': expected_title,
            'price': expected_price, 'userId': USER_ID}
    response = test_app.post(f'/post/{POST_ID}', json=json)

    post_data = PostOut.from_orm(Post.query.get(POST_ID)).dict()

    assert response.status_code == 200
    assert response.json() == post_data
    assert response.json()['title'] == expected_title
    assert response.json()['price'] == expected_price


def test_upload_post_image(test_app: TestClient):
    '''PUT /post/image/{post_id} route should set image_uri for the post object in the database and create an image in /image directory'''
    filename = 'test.jpg'
    path = f'tests/assets/{filename}'
    with open(path, 'rb') as file:
        files = {'image': (filename, file, 'image/jpeg')}
        response = test_app.put(f'/post/image/{POST_ID}', files=files)

        post_obj = Post.query.get(POST_ID)
        post_data = PostOut.from_orm(post_obj).dict()

        assert response.status_code == 200
        assert response.json() == post_data
        assert post_obj.image_uri == generate_image_uri(POST_ID, filename)

        assert os.path.isfile(post_obj.image_uri)


def test_get_post_image(test_app: TestClient):
    '''GET /post/image/{post_id} route should return image file response with 200 status code'''
    response = test_app.get(f'post/image/{POST_ID}')

    assert response.status_code == 200
