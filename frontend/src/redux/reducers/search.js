import {
    SET_SEARCH_QUERY,
    SET_SEARCH_FILTERS,
    SET_SEARCH_CATEGORY
} from '../types'
import { LOCATIONS } from '../../data'

const initialState = {
    query: '',
    category: '',
    filters: {
        priceFrom: 0,
        priceTo: 9999999,
        location: LOCATIONS.ALL,
        orderByOption: ''
    }
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return { ...state, query: action.payload.query }
        case SET_SEARCH_FILTERS:
            return { ...state, filters: action.payload.filters }
        case SET_SEARCH_CATEGORY:
            return { ...state, category: action.payload.category }
        default:
            return state
    }
}
