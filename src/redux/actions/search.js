import {
    SET_SEARCH_QUERY,
    SET_SEARCH_FILTERS,
    SET_SEARCH_CATEGORY
} from '../types'

export const setSearchQuery =
    (query = '') =>
    async dispatch => {
        console.log('!!! Dispatching query with value:', query)
        dispatch({
            type: SET_SEARCH_QUERY,
            payload: { query }
        })
    }

export const setSearchFilters =
    (filters = {}) =>
    async dispatch => {
        console.log('!!! Dispatching filters with value:', filters)
        dispatch({
            type: SET_SEARCH_FILTERS,
            payload: { filters }
        })
    }

export const setSearchCategory =
    (category = 'all') =>
    async dispatch => {
        console.log('!!! Dispatching category with value:', category)
        dispatch({
            type: SET_SEARCH_CATEGORY,
            payload: { category }
        })
    }
