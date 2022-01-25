import {
    SET_SEARCH_QUERY,
    SET_SEARCH_FILTERS,
    SET_SEARCH_CATEGORY
} from '../types'
import { LOCATIONS, SORT_BY_OPTIONS, CATEGORIES } from '../../data'

const initialState = {
    q: '',
    category: CATEGORIES[0].value,
    filters: {
        priceFrom: 0,
        priceTo: 9999999,
        location: LOCATIONS[0].value,
        orderByOption: SORT_BY_OPTIONS[0].value
    },
    from_: 0,
    to: 5,
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return { ...state, q: action.payload.q }
        case SET_SEARCH_FILTERS:
            return { ...state, filters: action.payload.filters }
        case SET_SEARCH_CATEGORY:
            return { ...state, category: action.payload.category }
        default:
            return state
    }
}
