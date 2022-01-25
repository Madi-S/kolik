import {
    SET_SEARCH_QUERY,
    SET_SEARCH_FILTERS,
    SET_SEARCH_CATEGORY
} from '../types'

export const setSearchQuery =
    (q = '') =>
    async dispatch => {
        dispatch({
            type: SET_SEARCH_QUERY,
            payload: { q }
        })
    }

export const setSearchFilters =
    (filters = {}) =>
    async dispatch => {
        dispatch({
            type: SET_SEARCH_FILTERS,
            payload: { filters }
        })
    }

export const setSearchCategory =
    (category = 'all') =>
    async dispatch => {
        dispatch({
            type: SET_SEARCH_CATEGORY,
            payload: { category }
        })
    }
