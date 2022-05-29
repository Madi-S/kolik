from typing import List
from loguru import logger
from sqlalchemy import or_

import enums
from models import Post
from .schema import PostQuery
from config import IMAGES_FOLDER


def generate_image_uri(post_id, name):
    logger.debug('Generated image uri', f'./{IMAGES_FOLDER}/{post_id}__{name}')
    return f'./images/{post_id}__{name}'


class PostQueryHandler:
    def __init__(self, params: PostQuery, ignore_deactivated: bool) -> None:
        self.params = params
        if ignore_deactivated:
            self.query = Post.query.filter_by(activated=True)
        else:
            self.query = Post.query

    def generate_entries(self):
        return self.query.all()

    def get_count(self):
        return self.query.count()

    def apply_all(self, apply_limit=True) -> List[Post]:
        self._apply_contains_q_to_columns()
        self._apply_filters()
        self._apply_order_by()
        if apply_limit:
            self._apply_offset_and_limit()

    def _apply_contains_q_to_columns(self) -> None:
        self.query = self.query.filter(
            or_(
                Post.title.ilike(f'%{self.params.q}%'),
                Post.description.ilike(f'%{self.params.q}%'),
            )
        )

    def _apply_filters(self) -> None:
        if self.params.filters.location != enums.Location.all:
            self._apply_location_filter()
        if self.params.category != enums.PostCategory.all:
            self._apply_category_filter()
        if self.params.filters.price_from < self.params.filters.price_to:
            self._apply_price_range_filter()

    def _apply_location_filter(self) -> None:
        self.query = self.query.filter_by(
            location=self.params.filters.location)

    def _apply_category_filter(self) -> None:
        self.query = self.query.filter_by(
            category=self.params.category)

    def _apply_price_range_filter(self) -> None:
        self.query = self.query.filter(
            Post.price >= self.params.filters.price_from)
        self.query = self.query.filter(
            Post.price <= self.params.filters.price_to)

    def _apply_order_by(self) -> None:
        order_by_column, order = self.params.filters.order_by_option.split(
            '-')
        descending_order = order == 'desc'

        if descending_order:
            order_by_expr = getattr(Post, order_by_column).desc()
        else:
            order_by_expr = getattr(Post, order_by_column)

        self.query = self.query.order_by(order_by_expr)

    def _apply_offset_and_limit(self) -> None:
        offset_value = self.params.from_
        limit_value = self.params.to - self.params.from_
        self.query = self.query.offset(offset_value).limit(limit_value)
