import { TOGGLE_DARK_THEME, TOGGLE_NOTIFICATIONS_ENABLED } from '../types'

export const toggleDarkTheme = status => async dispatch => {
    dispatch({
        type: TOGGLE_DARK_THEME,
        payload: { status }
    })
}

export const toggleNotificationsEnabled = status => async dispatch => {
    dispatch({
        type: TOGGLE_NOTIFICATIONS_ENABLED,
        payload: { status }
    })
}
