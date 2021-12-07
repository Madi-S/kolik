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

export default DATA = [
    {
        id: '1',
        price: 5000,
        img: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        title: 'Toyota Camry 50',
        phoneNumber: '+77784156981',
        createdAt: Date.now(),
        category: getRandomCategory(),
        location: getRandomLocation(),
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
        id: '2',
        price: 15000,
        img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        title: 'Mercedez Benz S',
        phoneNumber: '+77784156434',
        createdAt: Date.now(),
        category: getRandomCategory(),
        location: getRandomLocation(),
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
        id: '3',
        price: 2000,
        img: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        title: 'Lada 1992',
        phoneNumber: '+77784156981',
        createdAt: Date.now(),
        category: getRandomCategory(),
        location: getRandomLocation(),
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
        id: '4',
        price: 19000,
        img: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        title: 'Hyundai Accent',
        phoneNumber: '+77784156922',
        createdAt: Date.now(),
        category: getRandomCategory(),
        location: getRandomLocation(),
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
        id: '5',
        price: 22000,
        img: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        title: 'Porsche 718 Cayman',
        phoneNumber: '+77784156111',
        createdAt: Date.now(),
        category: getRandomCategory(),
        location: getRandomLocation(),
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    }
]
