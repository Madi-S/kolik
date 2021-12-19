import { SET_CURRENT_POST } from '../types'

export const setCurrentPost = currentPost => async dispatch => {
    dispatch({
        type: SET_CURRENT_POST,
        payload: { currentPost }
    })
}
