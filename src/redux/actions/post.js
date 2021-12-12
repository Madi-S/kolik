import { SET_CURRENT_POST } from '../types'

export const setCurrentPost = id => async dispatch => {
    dispatch({
        type: SET_CURRENT_POST,
        payload: { currentPost: id }
    })
}
