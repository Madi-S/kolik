from fastapi.testclient import TestClient

import os.path
from sqlalchemy import or_
from random import randint, choice

import enums
from models import Post, User
from config import IMAGES_FOLDER
from routers.post.schema import PostOut
from routers.post.utils import generate_image_uri


POST_ID = Post.query.first().id
USER_ID = Post.query.first().user_id


def test_query_posts__success(test_app: TestClient):
    """POST /post/query route should return a list of posts according to given query parameters"""
    from_ = randint(1, 4)
    to = randint(5, 9)
    price_from = 0
    price_from = randint(0, 10)
    price_to = randint(999999999, 999999999999)
    q = choice(("a", "b", "c", "d", "e", "f"))
    location = enums.Location.all
    category = enums.PostCategory.all
    # SQLAlchemy automatically orders entries by published_at
    order_by_option = enums.PostOrderByOption.published_at_asc

    json = {
        "q": q,
        "from_": from_,
        "to": to,
        "category": category,
        "filters": {
            "priceTo": price_to,
            "priceFrom": price_from,
            "location": location,
            "orderByOption": order_by_option,
        },
    }
    response = test_app.post("/post/query", json=json)

    filtered_posts = (
        Post.query.filter(
            or_(
                Post.title.ilike(f"%{q}%"),
                Post.description.ilike(f"%{q}%"),
            )
        )
        .filter(Post.price >= price_from)
        .filter(Post.price <= price_to)
        .offset(from_)
        .limit(to - from_)
    )

    assert response.status_code == 200
    assert len(response.json()) == filtered_posts.count()


def test_query_posts__fail_schema(test_app: TestClient):
    """POST /post/query route should raise 422 status code for invalid incoming json data"""
    invalid_json = {
        "q": "a",
        "from_": 123,
        "to": 55,
        "category": "all",
        "filters": {
            "priceTo": 10,
            "priceFrom": 10000,
            "location": "usa?",
            "orderByOption": "burger",
        },
    }
    response = test_app.post("/post/query", json=invalid_json)

    assert response.status_code == 422


def test_query_posts_count__success(test_app: TestClient):
    """POST /post/query/count route should return the length of a list of posts according to given query parameters"""
    price_from = 0
    price_from = randint(0, 10)
    price_to = randint(999999999, 999999999999)
    q = choice(("a", "b", "c", "d", "e", "f"))
    location = enums.Location.all
    category = enums.PostCategory.all
    # SQLAlchemy automatically orders entries by published_at
    order_by_option = enums.PostOrderByOption.published_at_asc

    json = {
        "q": q,
        "category": category,
        "filters": {
            "priceTo": price_to,
            "priceFrom": price_from,
            "location": location,
            "orderByOption": order_by_option,
        },
    }
    response = test_app.post(
        "/post/query/count", json=json, headers={"ignore-deactivated": "false"}
    )

    filtered_posts = (
        Post.query.filter(
            or_(Post.title.ilike(f"%{q}%"), Post.description.ilike(f"%{q}%"))
        )
        .filter(Post.price >= price_from)
        .filter(Post.price <= price_to)
    )

    assert response.status_code == 200
    assert response.json() == filtered_posts.count()


def test_query_posts_count__fail_schema(test_app: TestClient):
    """POST /post/query/count route should raise 422 status code for invalid incoming json data"""
    invalid_json = {
        "q": "a",
        "from_": 123,
        "to": 55,
        "category": "all",
        "filters": {
            "priceTo": 10,
            "priceFrom": 10000,
            "location": "usa?",
            "orderByOption": "burger",
        },
    }
    response = test_app.post(
        "/post/query/count", json=invalid_json, headers={"ignore-deactivated": "false"}
    )

    assert response.status_code == 422


def test_get_post_by_id__success(test_app: TestClient):
    """GET /post/{id} route should return User model by given id according to UserOut schema"""
    response = test_app.get(f"/post/{POST_ID}")

    post_data = PostOut.from_orm(Post.query.get(POST_ID)).dict(by_alias=True)

    assert response.status_code == 200
    assert response.json() == post_data


def test_get_post_by_id__fail_not_found(test_app: TestClient):
    """GET /post/{id} route should raise 404 status code for non existing post id"""
    non_existing_post_id = POST_ID + str(randint(1000, 9999))
    response = test_app.get(f"/post/{non_existing_post_id}")

    assert response.status_code == 404


def test_get_all_posts_by_user_id__success(test_app: TestClient):
    """GET /post/by_user/{user_id} route should return User model by given id according to UserOut schema"""
    response = test_app.get(f"/post/by_user/{USER_ID}")

    posts_objs = Post.query.filter_by(user_id=USER_ID).all()

    assert response.status_code == 200

    posts_json = response.json()

    assert len(posts_objs) == len(posts_json)

    for i in range(len(posts_json)):
        assert PostOut.from_orm(posts_objs[i]).dict(by_alias=True) == posts_json[i]


def test_get_all_posts_by_user_id__fail_not_found(test_app: TestClient):
    """GET /post/by_user/{user_id} route should raise 404 status code for non existing post id"""
    non_existing_post_id = POST_ID + str(randint(1000, 9999))
    response = test_app.get(f"/post/by_user/{non_existing_post_id}")

    assert response.status_code == 404


def test_create_post__success(test_app: TestClient):
    """PUT /post route should create post in the database with given arguments and return it"""
    json = {
        "title": "test",
        "price": 42,
        "description": "test",
        "location": enums.Location.kokshetau,
        "category": enums.PostCategory.suv,
        "userId": USER_ID,
    }
    response = test_app.put(f"/post/", json=json)

    post_id = response.json()["id"]
    post_obj = Post.query.get(post_id)
    post_data = PostOut.from_orm(post_obj).dict(by_alias=True)

    assert response.status_code == 201
    assert response.json() == post_data

    user_post_obj = User.query.get(USER_ID).posts[-1]
    user_post_data = PostOut.from_orm(post_obj).dict(by_alias=True)

    assert user_post_obj == post_obj
    assert response.json() == user_post_data


def test_create_post__fail_not_found(test_app: TestClient):
    """PUT /post route should raise 404 status code for non existing user with provided user id"""
    non_existing_user_id = USER_ID + str(randint(1000, 9999))
    json = {
        "title": "test",
        "price": 42,
        "description": "test",
        "location": enums.Location.kokshetau,
        "category": enums.PostCategory.suv,
        "userId": non_existing_user_id,
    }
    response = test_app.put(f"/post/", json=json)

    assert response.status_code == 404


def test_create_post__fail_schema(test_app: TestClient):
    """PUT /post route should raise 422 status code for invalid incoming json data"""
    json = {
        "title": "test",
        "price": -999,
        "description": "test",
        "location": enums.Location.kokshetau,
        "category": enums.PostCategory.suv,
        "userId": USER_ID,
    }
    response = test_app.put(f"/post/", json=json)

    assert response.status_code == 422


def test_delete_post__success(test_app: TestClient):
    """DELETE /post/{id} route should delete post in the database with given id"""
    test_post = Post.create(
        dict(title="Test", description="test", user_id=USER_ID, price=42)
    )

    response = test_app.delete(f"/post/{test_post.id}")

    assert response.status_code == 204


def test_delete_post__fail_not_found(test_app: TestClient):
    """DELETE /post/{id} route should raise 404 status code for non existing post id"""
    non_existing_post_id = POST_ID + str(randint(1000, 9999))

    response = test_app.delete(f"/post/{non_existing_post_id}")

    assert response.status_code == 404


def test_edit_post__success(test_app: TestClient):
    """POST /post/{id} route should edit post in the database with given arguments"""
    expected_title = "Changed title"
    expected_price = 228
    json = {"title": expected_title, "price": expected_price, "userId": USER_ID}
    response = test_app.post(f"/post/{POST_ID}", json=json)

    assert response.status_code == 204

    post_obj = Post.query.get(POST_ID)

    assert post_obj.title == expected_title
    assert post_obj.price == expected_price


def test_edit_post__fail_schema(test_app: TestClient):
    """POST /post/{id} route should raise 422 status code for invalid incoming json data (price)"""
    invalid_json = {"title": "test", "price": -999, "userId": USER_ID}
    response = test_app.post(f"/post/{POST_ID}", json=invalid_json)

    assert response.status_code == 422


def test_edit_post__fail_unauthorized(test_app: TestClient):
    """POST /post/{id} route should raise 401 status code for trying edit a post with user who did not create the post"""
    wrong_user_id = User.query.all()[-1].id
    json = {"title": "test", "price": 999, "userId": wrong_user_id}
    response = test_app.post(f"/post/{POST_ID}", json=json)

    assert response.status_code == 401


def test_edit_post__fail_not_found(test_app: TestClient):
    """POST /post/{id} route should raise 404 status code for invalid incoming json data (price)"""
    non_existing_post_id = POST_ID + str(randint(1000, 9999))
    json = {"title": "test", "price": 999, "userId": USER_ID}
    response = test_app.post(f"/post/{non_existing_post_id}", json=json)

    assert response.status_code == 404


def test_activate_post__success(test_app: TestClient):
    """POST /activate/{id} should activate post in the database and return True on success"""
    response = test_app.post(f"/post/activate/{POST_ID}")

    assert response.status_code == 200
    assert response.json() == True

    post = Post.query.get(POST_ID)
    assert post.activated == True


def test_activate_post__fail_not_found(test_app: TestClient):
    """POST /activate/{id} should raise 404 status code for non existing post id"""
    non_existing_user_id = USER_ID + str(randint(1000, 9999))
    response = test_app.post(f"/post/activate/{non_existing_user_id}")

    assert response.status_code == 404


def test_activate_post__fail_limit(test_app: TestClient):
    """POST /activate/{id} should raise 429 status code after 4 requests in a minute"""
    test_app.post(f"/post/activate/{POST_ID}")
    test_app.post(f"/post/activate/{POST_ID}")
    test_app.post(f"/post/activate/{POST_ID}")
    test_app.post(f"/post/activate/{POST_ID}")
    response = test_app.post(f"/post/activate/{POST_ID}")

    assert response.status_code == 429


def test_deactivate_post__success(test_app: TestClient):
    """POST /deactivate/{id} should activate post in the database and return True on success"""
    response = test_app.post(f"/post/deactivate/{POST_ID}")

    assert response.status_code == 200
    assert response.json() == True

    post = Post.query.get(POST_ID)

    assert post.activated == False


def test_deactivate_post__fail_not_found(test_app: TestClient):
    """POST /deactivate/{id} should raise 404 status code for non existing post id"""
    non_existing_user_id = USER_ID + str(randint(1000, 9999))
    response = test_app.post(f"/post/deactivate/{non_existing_user_id}")

    assert response.status_code == 404


def test_deactivate_post__fail_limit(test_app: TestClient):
    """POST /deactivate/{id} should raise 429 status code after 4 requests in a minute"""
    test_app.post(f"/post/deactivate/{POST_ID}")
    test_app.post(f"/post/deactivate/{POST_ID}")
    test_app.post(f"/post/deactivate/{POST_ID}")
    test_app.post(f"/post/deactivate/{POST_ID}")
    response = test_app.post(f"/post/deactivate/{POST_ID}")

    assert response.status_code == 429


def test_upload_post_image__success(test_app: TestClient):
    """PUT /post/image/{post_id} route should set image_uri for the post object in the database and create an image in /image directory"""
    filename = "test.jpg"
    path = f"tests/assets/{filename}"
    with open(path, "rb") as file:
        files = {"image": (filename, file, "image/jpeg")}
        response = test_app.put(f"/post/image/{POST_ID}", files=files)

        post_obj = Post.query.get(POST_ID)

        assert response.status_code == 204
        assert post_obj.image_uri == generate_image_uri(POST_ID, filename)
        assert os.path.isfile(post_obj.image_uri)


def test_upload_post_image__fail_not_found(test_app: TestClient):
    """PUT /post/image/{post_id} route should raise 404 status code for non existing post id"""
    filename = "test.jpg"
    path = f"tests/assets/{filename}"
    non_existing_post_id = POST_ID + str(randint(1000, 9999))
    with open(path, "rb") as file:
        files = {"image": (filename, file, "image/jpeg")}
        response = test_app.put(f"/post/image/{non_existing_post_id}", files=files)

        post_obj = Post.query.get(non_existing_post_id)

        assert post_obj is None
        assert response.status_code == 404


def test_get_post_image__success(test_app: TestClient):
    """GET /post/image/{post_id} route should return image file response with 200 status code"""
    response = test_app.get(f"post/image/{POST_ID}")

    assert response.status_code == 200


def test_get_post_image__fail_not_found(test_app: TestClient):
    """GET /post/image/{post_id} route should raise 404 status code for non existing post id"""
    non_existing_post_id = POST_ID + str(randint(1000, 9999))
    response = test_app.get(f"post/image/{non_existing_post_id}")

    assert response.status_code == 404
