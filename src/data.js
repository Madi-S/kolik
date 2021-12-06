const LOCATIONS = ['ALMATY', 'KARAGANDA', 'KOKSHETAU', 'NUR-SULTAN']

const CATEGORIES = [
    'SUV',
    'SEDAN',
    'COUPE',
    'MINIVAN',
    'HATCHBACK',
    'SPORTS CAR',
    'CONVERTIBLE',
    'STATION WAGON'
]

const getRandomLocation = () => {
    return LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]
}

const getRandomCategory = () => {
    return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
}

export const DATA = [
    {
        id: '1',
        price: 5000,
        photo: null,
        title: 'Toyota Camry 50',
        phoneNumber: '+77784156981',
        createdAt: Date.now(),
        category: getRandomCategory(),
        location: getRandomLocation(),
        description:
            'lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem'
    },
    {
        id: '2',
        price: 15000,
        photo: null,
        title: 'Mercedez Benz S',
        phoneNumber: '+77784156434',
        createdAt: Date.now(),
        category: getRandomCategory(),
        location: getRandomLocation(),
        description:
            'lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem'
    },
    {
        id: '3',
        price: 2000,
        photo: null,
        title: 'Lada 1992',
        phoneNumber: '+77784156981',
        createdAt: Date.now(),
        category: getRandomCategory(),
        location: getRandomLocation(),
        description:
            'lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem'
    },
    {
        id: '4',
        price: 19000,
        photo: null,
        title: 'Hyundai Accent',
        phoneNumber: '+77784156922',
        createdAt: Date.now(),
        category: getRandomCategory(),
        location: getRandomLocation(),
        description:
            'lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem'
    },
    {
        id: '5',
        price: 22000,
        photo: null,
        title: 'Porsche 718 Cayman',
        phoneNumber: '+77784156111',
        createdAt: Date.now(),
        category: getRandomCategory(),
        location: getRandomLocation(),
        description:
            'lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem'
    }
]
