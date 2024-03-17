import Select from './../../core/Select'

const ORDER_OPTINS = [
    { value: 'title-desc', text: 'Title' },
    { value: 'price_per_day-asc', text: 'Price Asc' },
    { value: 'price_per_day-desc', text: 'Price Desc' }
]

const LOCATION_OPTIONS = [
    { value: 'astana', text: 'Astana' },
    { value: 'almaty', text: 'Almaty' },
    { value: 'kokshetau', text: 'Kokshetau' }
]

export default () => {
    return (
        <div className='feed__search-params'>
            <Select id='order' label='Order' options={ORDER_OPTINS} />
            <Select id='filter' label='Location' options={LOCATION_OPTIONS} />
        </div>
    )
}
