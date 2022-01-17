export const SORT_BY_OPTIONS = [
    { label: 'Published (from newest)', value: 'published_at_desc' },
    { label: 'Published (from oldest)', value: 'published_at_asc' },
    { label: 'Price (from highest)', value: 'price_desc' },
    { label: 'Price (from lowest)', value: 'price_asc' },
    { label: 'Title', value: 'title' }
]

export const LOCATIONS = [
    { label: 'Kazakhstan', value: 'all' },
    { label: 'Almaty', value: 'almaty' },
    { label: 'Karaganda', value: 'karaganda' },
    { label: 'Kokshetau', value: 'Kokshetau' },
    { label: 'Nur-Sultan', value: 'nur-sultan' }
]

export const CATEGORIES = [
    { label: 'ALL', value: 'all' },
    { label: 'SUV', value: 'suv' },
    { label: 'SEDAN', value: 'sedan' },
    { label: 'COUPE', value: 'coupe' },
    { label: 'MINIVAN', value: 'minivan' },
    { label: 'HATCHBACK', value: 'hatchback' },
    { label: 'SPORTS CAR', value: 'sports_car' },
    { label: 'CONVERTIBLE', value: 'convertible' },
    { label: 'STATION WAGON', value: 'station_wagon' }
]

export const getRandomLocation = () => {
    return LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]
}

export const getRandomCategory = () => {
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
