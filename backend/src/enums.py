from enum import Enum


class Location(str, Enum):
    all = 'ALL'
    astana = 'ASTANA'
    almaty = 'ALMATY'
    kokshetau = 'KOKSHETAU'


class CarType(str, Enum):
    ...
