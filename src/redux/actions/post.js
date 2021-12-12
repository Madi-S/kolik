import { SET_CURRENT_POST_ID } from '../types'

export const setCurrentPostId = id => async dispatch => {
    dispatch({
        type: SET_CURRENT_POST_ID,
        payload: {currentPostId: id}
    })
}
