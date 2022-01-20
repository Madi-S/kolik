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


class PostOrderByOption(str, Enum):
    title_asc = 'title-asc'
    title_desc = 'title-desc'
    price_asc = 'price-asc'
    price_desc = 'price-desc'
    
    '''From oldest to newest post'''
    published_at_asc = 'published_at-asc'
    
    '''From newest to oldest post'''
    published_at_desc = 'published_at-desc'
