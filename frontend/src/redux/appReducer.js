import {
    APP_SHOW_ALERT,
    APP_HIDE_ALERT,
    APP_USER_LOGGED_IN,
    APP_USER_LOGGED_OUT
} from './types'

const initialState = {
    data: {},
    alert: {},
    showAlert: false,
    userLoggedIn: false
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case APP_SHOW_ALERT:
            return {
                ...state,
                showAlert: true,
                alert: {
                    message: action.payload.message,
                    category: action.payload.category
                }
            }

        case APP_HIDE_ALERT:
            return { ...state, showAlert: false, alert: {} }

        case APP_USER_LOGGED_IN:
            return { ...state, userLoggedIn: true }

        case APP_USER_LOGGED_OUT:
            return { ...state, userLoggedIn: false }

        default:
            return state
    }
}
