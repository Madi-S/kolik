import {
    SET_CURRENT_POST,
    SET_SEARCH_QUERY,
    SET_SEARCH_FILTERS,
    SET_SEARCH_CATEGORY
} from '../types'
import DATA from '../../data'

const initialState = {
    currentPost: null,
    query: '',
    filters: {},
    category: 'all'
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
