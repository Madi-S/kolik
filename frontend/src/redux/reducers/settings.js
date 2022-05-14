import { TOGGLE_DARK_THEME, TOGGLE_NOTIFICATIONS_ENABLED } from '../types'

const initialState = {
    darkThemeEnabled: false,
    notificationsEnabled: false
}

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_DARK_THEME:
            return { ...state, darkThemeEnabled: action.payload.status }
        case TOGGLE_NOTIFICATIONS_ENABLED:
            return { ...state, notificationsEnabled: action.payload.status }
        default:
            return state
    }
}
