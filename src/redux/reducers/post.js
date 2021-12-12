import { SET_CURRENT_POST_ID } from '../types'

const initialState = {
    currentPostId: null
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_POST_ID:
            return {
                ...state,
                currentPostId: action.payload.currentPostId
            }
        default:
            return state
    }
}
