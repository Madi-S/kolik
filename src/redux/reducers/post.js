import { SET_CURRENT_POST } from '../types'

const initialState = {
    currentPost: null
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_POST:
            return {
                ...state,
                currentPost: action.payload.currentPost
            }
        default:
            return state
    }
}
