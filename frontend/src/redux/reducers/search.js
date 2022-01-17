import {
    SET_SEARCH_QUERY,
    SET_SEARCH_FILTERS,
    SET_SEARCH_CATEGORY
} from '../types'

const initialState = {
    query: '',
    category: '',
    filters: {
        priceFrom: 0,
        priceTo: 99999,
        location: 'ALL',
        sortByOption: ''
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
