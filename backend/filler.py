import random
from faker import Faker
from loguru import logger

from models import User, Phone, Post
from enums import Location, PostCategory


faker = Faker()

locations = [l.value for l in Location]
post_categories = [pc.value for pc in PostCategory]

users = []
posts = []


def fill_user(n=10) -> None:
    for n in range(n):
        phone = Phone.create('+' + faker.msisdn()[:-1])

        user_data = {
            'name': faker.name(),
            'phone': phone.value,
            'location': random.choice(locations),
        }
        user = User.create(user_data)
        users.append(user)
        logger.debug('User #{} created', n + 1)


def fill_post(n=10) -> None:
    for n in range(n):
        post_data = {
            'description': faker.text(),
            'title': faker.catch_phrase(),
            'location': random.choice(locations),
            'category': random.choice(post_categories),
            'price': random.randint(100, 9999999),
            'user_id': random.choice(users).id
        }
        post = Post.create(post_data)
        posts.append(post)
        logger.debug('Post #{} created', n + 1)


def main() -> None:
    fill_user()
    fill_post()


if __name__ == '__main__':
    main()
