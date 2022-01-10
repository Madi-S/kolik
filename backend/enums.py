from enum import Enum


class Location(str, Enum):
    all = 'all'
    almaty = 'almaty'
    karaganda = 'karaganda'
    kokshetau = 'kokshetau'
    nur_sultan = 'nur-sultan'


class PostCategory(str, Enum):
    all = 'all'
    suv = 'suv'
    sedan = 'sedan'
    coupe = 'coupe'
    minivan = 'minivan'
    hatchback = 'hatchback'
    sports_car = 'sports_car'
    convertible = 'convertible'
    station_wagon = 'station_wagon'


class PostSortByOption(str, Enum):
    title = 'title'
    price_asc = 'price_asc'
    price_desc = 'price_desc'
    published_at_asc = 'published_at_asc'
    published_at_desc = 'published_at_desc'
